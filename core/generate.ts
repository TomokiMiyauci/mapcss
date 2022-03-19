import { isString, isUndefined, postcss, prop, Root } from "../deps.ts";
import { extractBySpace } from "./extract.ts";
import { resolveConfig, resolveCSSMap, resolveModifierMap } from "./resolve.ts";
import { escapeSelector } from "./utils/escape.ts";
import {
  minify as postcssMinify,
  orderProp,
  orderStatement,
} from "./postcss/mod.ts";
import { createInjectCSS } from "./preprocess.ts";
import { CHAR_MAP, SEPARATOR, VARIABLE_PREFIX } from "./constant.ts";
import type { Config, RuntimeContext, StaticContext, Syntax } from "./types.ts";

const defaultSyntax: Syntax = {
  name: "mapcss/default-syntax",
  fn: (identifier) => ({ identifier }),
};

export type Option = {};

export type Result = {
  /** The `string` of CSS Style Sheet.
   * The AST is converted to `string` when the property is accessed.
   */
  css: string;

  /** PostCSS AST */
  ast: Root;

  /** The matched tokens */
  matched: Set<string>;

  /** The unmatched tokens */
  unmatched: Set<string>;
};

function rootKeys(
  value: Readonly<Readonly<Record<PropertyKey, unknown>>[]>,
): string[] {
  return Array.from(value.reduceRight((acc, cur) => {
    Object.keys(cur).forEach((key) => {
      acc.add(key);
    });
    return acc;
  }, new Set<string>()));
}

/** Generate result of CSS Style Sheet */
export function generate(
  input: Set<string> | string,
  {
    separator = SEPARATOR,
    variablePrefix = VARIABLE_PREFIX,
    charMap = CHAR_MAP,
    minify = false,
    extract = extractBySpace,
    ...staticConfig
  }: Readonly<
    Config
  >,
  {}: Readonly<Partial<Option>> = {},
): Result {
  const ctx = {
    separator,
    variablePrefix,
    charMap,
    minify,
    extract,
  };
  const {
    syntax,
    modifierMaps,
    theme,
    cssMaps,
    preProcess,
    postcssPlugin,
    css,
  } = resolveConfig(staticConfig, ctx);
  const staticContext: StaticContext = {
    ...ctx,
    theme,
  };
  const tokens = isString(input) ? extract(input) : input;
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const results = Array.from(tokens).map((token) => {
    let rootCache: Root | undefined;
    const mappedToken = mapChar(token, charMap);

    for (const { fn } of [...syntax, defaultSyntax]) {
      const parseResult = fn(mappedToken, {
        ...staticContext,
        modifierRoots: rootKeys(modifierMaps),
        identifierRoots: rootKeys(cssMaps),
      });
      if (!parseResult) return;
      const { identifier, modifiers = [] } = parseResult;
      const className = `.${escapeSelector(token)}`;
      const runtimeContext: RuntimeContext = {
        token,
        mappedToken,
        className,
      };

      const identifierRoot = resolveCSSMap(
        identifier,
        cssMaps.reverse(),
        {
          ...staticContext,
          ...runtimeContext,
        },
      );

      if (isUndefined(identifierRoot)) continue;
      const results = modifiers.reduceRight((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMaps, acc, {
          ...staticContext,
          ...runtimeContext,
        });
      }, identifierRoot as Root | undefined);

      if (results instanceof Root) {
        unmatched.delete(token);
        matched.add(token);
        rootCache = results;
        break;
      }

      unmatched.add(token);
    }
    return rootCache;
  }).filter(Boolean) as Root[];

  const rootNode = results.reduce((acc, cur) => {
    acc.append(cur.nodes);
    return acc;
  }, new Root());

  const final = [createInjectCSS(css), ...preProcess].reduce(
    (acc, cur) => cur.fn(acc, staticContext),
    rootNode,
  );

  const corePostcssPlugins = [orderStatement(), orderProp()];
  const plugins = minify
    ? [...corePostcssPlugins, postcssMinify()]
    : corePostcssPlugins;
  const ast = postcss(...plugins, ...postcssPlugin).process(final).root;

  const result: Result = {
    ast,
    get css(): string {
      return ast.toString();
    },
    matched,
    unmatched,
  };

  return result;
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
