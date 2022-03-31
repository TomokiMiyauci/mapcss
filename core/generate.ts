// This module is browser compatible.

import {
  isString,
  isUndefined,
  postcss,
  prop,
  Root,
  toAST,
  wrap,
} from "./deps.ts";
import { resolveConfig, resolveCSSMap, resolveModifierMap } from "./resolve.ts";
import { escapeSelector } from "./utils/escape.ts";
import {
  minify as postcssMinify,
  orderProp,
  orderStatement,
} from "./postcss/mod.ts";
import { createInjectCSS } from "./preprocess.ts";
import { CHAR_MAP, OPTION, SEPARATOR, VARIABLE_PREFIX } from "./constant.ts";
import type {
  Config,
  Option,
  Output,
  RuntimeContext,
  StaticContext,
  Syntax,
} from "./types.ts";

const defaultSyntax: Syntax = {
  name: "mapcss/default-syntax",
  fn: (identifier) => ({ identifier }),
};

export type Input = Set<string> | string[] | string;

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

/** Generate output of CSS Style Sheet */
export async function generate(
  /** Input token */
  input: Input,
  {
    separator = SEPARATOR,
    variablePrefix = VARIABLE_PREFIX,
    charMap = CHAR_MAP,
    minify = false,
    ...staticConfig
  }: Readonly<
    Config
  >,
  option: Readonly<Option> = OPTION,
): Promise<Output> {
  const ctx = {
    separator,
    variablePrefix,
    charMap,
    minify,
  };
  const {
    syntax,
    modifierMaps,
    theme,
    cssMaps,
    preProcess,
    postcssPlugin,
    cssList,
  } = resolveConfig(staticConfig, ctx);
  const staticContext: StaticContext = {
    ...ctx,
    theme,
  };
  const tokens = toTokens(input);
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

      const maybeCSS = resolveCSSMap(
        identifier,
        cssMaps.reverse(),
        {
          ...staticContext,
          ...runtimeContext,
        },
      );

      if (isUndefined(maybeCSS)) continue;
      const results = modifiers.reduceRight((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMaps, acc, {
          ...staticContext,
          ...runtimeContext,
        });
      }, toAST(maybeCSS) as Root | undefined);

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
  const orderedNode = postcss(orderStatement()).process(rootNode).root;
  const preProcesses = [
    // default order is left to right
    ...option.injectCSS ? cssList.reverse().map(createInjectCSS) : [],
    ...preProcess,
  ];

  const final = preProcesses.reduce(
    (acc, cur) => cur.fn(acc, staticContext),
    orderedNode,
  );

  const corePostcssPlugins = [orderProp()];
  const plugins = minify
    ? [...corePostcssPlugins, postcssMinify()]
    : corePostcssPlugins;
  const result = await postcss(...plugins, ...postcssPlugin).process(final);

  const output: Output = {
    get ast(): Root {
      return result.root.root();
    },
    get css(): string {
      return result.toString();
    },
    matched,
    unmatched,
  };

  return output;
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

function isSet<T>(value: Iterable<T>): value is Set<T> {
  return value instanceof Set;
}

function toTokens(input: Input): Set<string> {
  return isSet(input) ? input : new Set(wrap(input));
}
