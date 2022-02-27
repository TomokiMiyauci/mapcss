import { isString, isUndefined, postcss, prop, Root } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveDeepMapSpecifier,
  resolveModifierMap,
} from "./resolve.ts";
import { escapeRegExp } from "./utils/escape.ts";
import { minify, orderProp } from "./postcss/mod.ts";
import type { Config, RuntimeContext, StaticContext } from "./types.ts";

const SEPARATOR = "-";
const VARIABLE_PREFIX = "map-";
const CHAR_MAP = { "_": " " };

export type Option = {
  /** Whether or not to compress the Node
   * This will compress AST and outputted Style Sheets, but will reduce performance.
   * It is recommended to use it in production.
   * @default false
   */
  compress: boolean;
};

export type Result = {
  /** Style Sheet */
  css: string;

  /** PostCSS AST */
  ast: Root;

  /** The matched tokens */
  matched: Set<string>;

  /** The unmatched tokens */
  unmatched: Set<string>;
};

/** Generate result of CSS Style Sheet */
export function generate(
  {
    separator = SEPARATOR,
    variablePrefix = VARIABLE_PREFIX,
    charMap = CHAR_MAP,
    ...staticConfig
  }: Readonly<
    Partial<
      Config
    >
  >,
  input: Set<string> | string,
  { compress = false }: Readonly<Partial<Option>> = { compress: false },
): Result {
  const ctx = {
    separator,
    variablePrefix,
    charMap,
  };
  const {
    syntax,
    modifierMap,
    theme,
    deepMapSpecifier,
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
        specifierRoots: Array.from(deepMapSpecifier.keys()) as string[],
      });
      if (!parseResult) return;
      const { specifier, modifiers = [] } = parseResult;
      const className = `.${escapeRegExp(token)}`;
      const runtimeContext: RuntimeContext = {
        token,
        mappedToken,
        className,
      };

      const specifierRoot = resolveDeepMapSpecifier(
        specifier,
        deepMapSpecifier,
        {
          ...staticContext,
          ...runtimeContext,
          specifier,
        },
      );
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

  const plugins = compress ? [orderProp(), minify()] : [];
  const ast = postcss(plugins).process(final).root;

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
