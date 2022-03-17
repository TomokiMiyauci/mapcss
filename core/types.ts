import type { AcceptedPlugin, Root } from "../deps.ts";

export type BinaryTree<Leaf, P extends PropertyKey = string | number> = {
  [k in P]: Leaf | BinaryTree<Leaf>;
};

export type CSSDefinition = {
  type: "css";
  value: BinaryTree<string | number>;
};

export type CSSObject =
  | CSSDefinition
  | Root
  | BlockDefinition;

export type Preset = Labeled & {
  fn: (
    context: Readonly<Omit<StaticContext, "theme">>,
  ) => Partial<Omit<StaticConfig, "preset">>;
};

export type Theme = BinaryTree<string>;

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
  css: BinaryTree<string | number>;
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

  /** Extract token
   * @default [Function: extractBySpace]
   */
  extract: (value: string) => Set<string>;
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

export type Config = StaticConfig & StaticContext;

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

type Labeled = {
  /** The name will probably be used to remove duplicates. */
  name: string;
};

export type PreProcessor = Labeled & {
  fn: (root: Readonly<Root>, context: Readonly<StaticContext>) => Root;
};

/** User definition of CSS Block Declaration */
export type BlockDefinition = Record<string, string | number>;

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
