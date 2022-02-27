import { isString, isUndefined, postcss, prop, Root } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import {
  resolveConfig,
  resolveDeepMapSpecifier,
  resolveModifierMap,
} from "./resolve.ts";
import { escapeRegExp } from "./utils/escape.ts";
import { minify, orderProp } from "./postcss/mod.ts";
import { objectify } from "./ast.ts";
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
  fn: (specifier) => ({ specifier }),
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
    let rootCache: Root | undefined;
    const mappedToken = mapChar(token, charMap);

    for (const { fn } of [...syntax, defaultSyntax]) {
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
      if (isUndefined(specifierRoot)) continue;
      const results = modifiers.reduce((acc, cur) => {
        if (isUndefined(acc)) return;

        return resolveModifierMap(cur, modifierMap, acc, {
          ...staticContext,
          ...runtimeContext,
          modifier: cur,
        });
      }, specifierRoot as Root | undefined);

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
    get js() {
      return objectify(ast);
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
