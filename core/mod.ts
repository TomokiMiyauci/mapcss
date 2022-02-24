import { isString, isUndefined, postcss, prop, Root } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveModifierMap,
  resolveSpecifierMap,
} from "./resolve.ts";
import type { Config } from "./types.ts";
import { minify, orderProp } from "./postcss/mod.ts";
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

      const specifierRoot = resolveSpecifierMap(specifier, specifierMap, {
        theme,
        variablePrefix,
        separator,
        token,
      });
      if (isUndefined(specifierRoot)) return;

      const results = modifiers.reduce((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMap, acc, {
          theme,
          separator,
          modifier: cur,
        });
      }, specifierRoot as Root | undefined);

      if (!isUndefined(results)) {
        matched.add(token);
      } else {
        unmatched.add(token);
      }
      return results;
    }).filter(Boolean) as Root[];
    return executeResults;
  }).flat();

  const rootNode = results.reduce((acc, cur) => {
    acc.append(cur.nodes);
    return acc;
  }, new Root());

  const final = processors.reduce((acc, cur) => {
    return cur.fn(acc, { variablePrefix });
  }, rootNode);

  const css = postcss([orderProp(), minify()]).process(final).toString();

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
