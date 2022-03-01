import {
  isString,
  isUndefined,
  postcss,
  prop,
  Root,
  toObject,
} from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveDeepMapIdentifier,
  resolveModifierMap,
} from "./resolve.ts";
import { escapeSelector } from "./utils/escape.ts";
import { minify, orderProp, orderStatement } from "./postcss/mod.ts";
import { createInjectCSS } from "./preprocess.ts";
import type {
  BinaryTree,
  Config,
  RuntimeContext,
  StaticContext,
  Syntax,
} from "./types.ts";

const SEPARATOR = "-";
const VARIABLE_PREFIX = "map-";
const CHAR_MAP = { "_": " " };

const defaultSyntax: Syntax = {
  name: "mapcss/default-syntax",
  fn: (identifier) => ({ identifier }),
};

export type Option = {
  /** Whether or not to compress the Node
   * This will compress AST and outputted Style Sheets, but will reduce performance.
   * It is recommended to use it in production.
   * @default false
   */
  compress: boolean;
};

export type Result = {
  /** The `string` of CSS Style Sheet.
   * The AST is converted to `string` when the property is accessed.
   */
  css: string;

  /** PostCSS AST */
  ast: Root;

  /** JavaScript Object with CSS-in-JS notation.
   * The AST is converted to JavaScript Object when the property is accessed.
   */
  js: BinaryTree<string | number>;

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
    deepMapCSS,
    preProcess,
    postcssPlugin,
    css,
  } = resolveConfig(staticConfig, ctx);
  const staticContext: StaticContext = {
    ...ctx,
    theme,
  };
  const tokens = isString(input) ? extractSplit(input) : input;
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const results = Array.from(tokens).map((token) => {
    let rootCache: Root | undefined;
    const mappedToken = mapChar(token, charMap);

    for (const { fn } of [...syntax, defaultSyntax]) {
      const parseResult = fn(mappedToken, {
        ...staticContext,
        modifierRoots: Object.keys(modifierMap),
        identifierRoots: Array.from(deepMapCSS.keys()) as string[],
      });
      if (!parseResult) return;
      const { identifier, modifiers = [] } = parseResult;
      const className = `.${escapeSelector(token)}`;
      const runtimeContext: RuntimeContext = {
        token,
        mappedToken,
        className,
      };

      const identifierRoot = resolveDeepMapIdentifier(
        identifier,
        deepMapCSS,
        {
          ...staticContext,
          ...runtimeContext,
          identifier,
        },
      );
      if (isUndefined(identifierRoot)) continue;
      const results = modifiers.reduce((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMap, acc, {
          ...staticContext,
          ...runtimeContext,
          modifier: cur,
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
  const plugins = compress
    ? [...corePostcssPlugins, minify()]
    : corePostcssPlugins;
  const ast = postcss(...plugins, ...postcssPlugin).process(final).root;

  const result: Result = {
    ast,
    get css(): string {
      return ast.toString();
    },
    get js() {
      return toObject(ast);
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
