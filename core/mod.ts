import { isString, isUndefined, prop } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveModifierMap,
  resolveSpecifierMap,
} from "./resolve.ts";
import {
  cssStatements2CSSNestedModule,
  stringifyCSSNestedModule,
} from "./utils/format.ts";
import type { Config, CSSStatement } from "./types.ts";
import {
  declarationOrderProcessor,
  statementOrderProcessor,
} from "./post_process.ts";
export * from "./types.ts";

export interface GenerateResult {
  css: string;
  matched: Set<string>;
  unmatched: Set<string>;
}

/** Generate CSS Style Sheet as string */
export function generateStyleSheet(
  {
    separator = "-",
    variablePrefix = "map-",
    charMap = { "_": " " },
    ...config
  }: Partial<
    Config
  >,
  input: Set<string> | string,
): GenerateResult {
  const { postProcess: _postProcess = [], ...rest } = config;
  _postProcess.push(statementOrderProcessor);
  _postProcess.push(declarationOrderProcessor);

  const {
    syntaxes,
    modifierMap,
    theme,
    specifierMap,
    postProcess: processors,
  } = resolveConfig({ ...rest, postProcess: _postProcess });

  const tokens = isString(input) ? extractSplit(input) : input;
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const results = Array.from(tokens).map((token) => {
    const mappedToken = mapChar(token, charMap);
    const executeResults = syntaxes.map(({ fn }) => {
      const parseResult = fn({
        token: mappedToken,
        modifierRoots: Object.keys(modifierMap),
        specifierRoots: Object.keys(specifierMap),
      });
      if (!parseResult) return;
      const { specifier, modifiers = [] } = parseResult;

      const cssStatements = resolveSpecifierMap(specifier, specifierMap, {
        theme,
        variablePrefix,
        separator,
        token,
      });
      if (isUndefined(cssStatements)) return;

      const results = modifiers.reduce(
        (acc, modifier) =>
          acc.map((cssStatement) =>
            resolveModifierMap(modifier, modifierMap, cssStatement, {
              theme,
              separator,
              modifier,
            })
          ).filter(Boolean) as CSSStatement[],
        cssStatements,
      );

      if (results.length) {
        matched.add(token);
      } else {
        unmatched.add(token);
      }
      return results;
    }).filter(Boolean).flat() as CSSStatement[];
    return executeResults;
  }).flat();

  const final = processors.reduce((acc, cur) => {
    return cur.fn(acc, { variablePrefix });
  }, results);
  const cssNestedModule = cssStatements2CSSNestedModule(final);
  const css = stringifyCSSNestedModule(cssNestedModule);

  return { css, matched, unmatched };
}

export function mapChar(
  character: string,
  charMap: Record<string, string>,
): string {
  let value = "";
  for (const char of character) {
    const c = prop(char, charMap);
    if (isString(c)) {
      value += c;
    } else {
      value += char;
    }
  }
  return value;
}
