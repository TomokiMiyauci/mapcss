// This module is browser compatible.

import type { AcceptedPlugin, Arrayable, CSSProperties, Root } from "./deps.ts";
// deno-lint-ignore no-unused-vars
import { simpleExtractor } from "./extract.ts";

export type Tree<Leaf, P extends PropertyKey = string | number> = {
  [k in P]: Leaf | Tree<Leaf>;
};

export type CSS = Tree<string | number>;

/** CSS Block Declaration */
export type DeclBlock =
  | Record<keyof CSSProperties, string | number>
  | Record<string, string | number>;

export type CSSDefinition = {
  type: "css";
  value: CSS;
};
export type DeclBlockDefinition = {
  type: "decl";
  value: DeclBlock;
};

export type CSSObject =
  | CSSDefinition
  | DeclBlockDefinition
  | DeclBlock;

export type Preset = Labeled & {
  fn: (
    context: Readonly<Omit<StaticContext, "theme">>,
  ) => Partial<Omit<StaticConfig, "preset">>;
};

export type Theme = Tree<string>;

export type StaticConfig = {
  /** Hierarchy of CSS-in-JS  */
  cssMap: CSSMap;

  /** Hierarchy of modifier */
  modifierMap: ModifierMap;

  theme: Theme;

  preset: Preset[];

  syntax: Syntax[];

  preProcess: PreProcessor[];

  /** PostCSS plugins  */
  postcssPlugin: AcceptedPlugin[];

  /** Inject raw CSS Statement with CSS-in-JS style */
  css: Arrayable<CSS>;
};

export type StaticContext = {
  theme: Readonly<Theme>;

  /** The token separator
   * @default `-`
   */
  separator: string;

  /** Prefix for CSS custom property (variable)
   * @default 'map-'
   */
  variablePrefix: string;

  /** Specifies a map of strings.
   * It is mainly used to reassign special characters.
   * @default charMap: { "_": " " }
   */
  charMap: Readonly<Record<string, string>>;

  /** Whether or not to minify the Node
   * This will compress AST and outputted Style Sheets, but will reduce performance.
   * It is recommended to use it in production.
   * @default false
   */
  minify: boolean;
};

export type RuntimeContext = {
  /** The token as it
   *
   * example: `sm:text-red-500` -> `sm:text-red-500`
   */
  token: string;

  /** The token after conversion with char map
   *
   * example:
   *
   * token: `content-['hello_world']`
   *
   * charMap: `{ "_": " " }`
   *
   * mappedToken: `content-['hello world']`
   */
  mappedToken: string;

  /** The token with `.` and escaped for selector.
   *
   * example: `text-red-500/[10]` -> `.text-red-500\\[10\\]`
   */
  className: string;
};

export type SyntaxContext = StaticContext & {
  modifierRoots: string[];
  identifierRoots: string[];
};
export type ParseResult = {
  identifier: string;
  modifiers?: string[];
};

export type Syntax = Labeled & {
  fn: (
    token: RuntimeContext["token"],
    context: Readonly<SyntaxContext>,
  ) => ParseResult | undefined;
};

export type Labeled = {
  /** The name will probably be used to remove duplicates. */
  name: string;
};

export type PreProcessor = Labeled & {
  fn: (root: Readonly<Root>, context: Readonly<StaticContext>) => Root;
};

export type DynamicCSS = (
  /** Match info */
  matchInfo: MatchInfo,
  context: Readonly<
    & StaticContext
    & RuntimeContext
  >,
) => CSSMap | CSSObject | undefined;

export type IdentifierDefinition =
  | CSSObject
  | DynamicCSS
  | CSSMap;

export type CSSMap =
  | {
    [k in string | number]: IdentifierDefinition;
  }
  | {
    /** Default accessor */
    "": IdentifierDefinition;

    /** Catch all property accessor */
    "*": IdentifierDefinition;
  };

export type ModifierMap =
  | {
    [k in string | number]: ModifierDefinition;
  }
  | {
    /** Default accessor */
    "": IdentifierDefinition;

    /** Catch all property accessor */
    "*": ModifierDefinition;
  };

export type Modifier = (
  parentNode: Readonly<Root>,
  matchInfo: MatchInfo,
  context: Readonly<StaticContext & RuntimeContext>,
) => Root | undefined;

export type ModifierDefinition = Modifier | ModifierMap;

export type MatchInfo = {
  /** Matched property key
   *
   * example: text-`red`-500 -> `red`
   */
  id: string;

  /** The matched parent property key
   *
   * example: text-`red`-500 -> `text`
   */
  parentId?: string;

  /** Full path */
  fullPath: string;

  /** Current search path
   *
   * example: `text-red-500`
   *
   * 1st: `["text-red-500"]`
   *
   * 2nd: `["text-red", "500"]`
   *
   * 3rd: `["text", "red", "500"]`
   */
  path: string[];
};

export type Extractor = Labeled & {
  fn: (code: string) => Set<string>;
};

export type Config = {
  /** Token extractor
   * @default {@link simpleExtractor}
   */
  readonly extractor?: Arrayable<Extractor>;
} & Partial<StaticConfig & StaticContext>;

export type Option = Partial<{
  /** Whether to inject with `css` or not.
   * @default true
   */
  injectCSS: boolean;
}>;

export type Output = {
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
