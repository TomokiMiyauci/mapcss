import { isString, isUndefined, postcss, prop, Root } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveMappedSpecifier,
  resolveModifierMap,
} from "./resolve.ts";
import { escapeRegExp } from "./utils/escape.ts";
import type { Config, RuntimeContext, StaticContext } from "./types.ts";
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
    ...staticConfig
  }: Partial<
    Config
  >,
  input: Set<string> | string,
): GenerateResult {
  const ctx = {
    separator,
    variablePrefix,
    charMap,
  };
  const {
    syntax,
    modifierMap,
    theme,
    mappedSpecifier,
    preProcess,
  } = resolveConfig(staticConfig, ctx);
  const staticContext: StaticContext = {
    ...ctx,
    theme,
  };
  const tokens = isString(input) ? extractSplit(input) : input;
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const results = Array.from(tokens).map((token) => {
    const mappedToken = mapChar(token, charMap);
    const executeResults = syntax.map(({ fn }) => {
      const parseResult = fn(mappedToken, {
        ...staticContext,
        modifierRoots: Object.keys(modifierMap),
        specifierRoots: Array.from(mappedSpecifier.keys()) as string[],
      });
      if (!parseResult) return;
      const { specifier, modifiers = [] } = parseResult;
      const className = `.${escapeRegExp(token)}`;
      const runtimeContext: RuntimeContext = {
        token,
        mappedToken,
        className,
      };

      const specifierRoot = resolveMappedSpecifier(specifier, mappedSpecifier, {
        ...staticContext,
        ...runtimeContext,
        specifier,
      });
      if (isUndefined(specifierRoot)) return;

      const results = modifiers.reduce((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMap, acc, {
          ...staticContext,
          ...runtimeContext,
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

  const final = preProcess.reduce((acc, cur) => {
    return cur.fn(acc, staticContext);
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
