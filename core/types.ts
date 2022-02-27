import type { Root } from "../deps.ts";

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

export type IdentifierContext =
  & StaticContext
  & RuntimeContext
  & {
    /** Full identifier */
    identifier: string;

    /** The matched object key
     *
     * example: text-`red`-500 -> `red`
     */
    key: string;

    /** The matched parent key
     *
     * example: text-`red`-500 -> `text`
     */
    parentKey: string | undefined;

    /** Current search path
     *
     * example: `text-red-500`
     *
     * 1st: `["text-red-500"]`
     * 2nd: `["text-red", "500"]`
     * 3rd: `["text", "red", "500"]`
     */
    path: string[];
  };

export type Preset = Labeled & {
  fn: (
    context: Readonly<Omit<StaticContext, "theme">>,
  ) => Partial<Omit<StaticConfig, "preset">>;
};

export type ModifierContext = StaticContext & RuntimeContext & {
  /** Full modifier */
  modifier: string;

  /** Current search path
   *
   * example: `group-hover`
   *
   * 1st: `["group-hover"]`
   * 2nd: `["group", "hover"]`
   */
  path: Readonly<string[]>;
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

export type ModifierMap = Record<
  string | number,
  Modifier | ModifierDefinition
>;

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

export type CSSMap = {
  [k in string | number]: Identifier | BlockDefinition | IdentifierHandler;
};

export type RecordIdentifier = {
  [k: string | number]: BlockDefinition | IdentifierHandler | Identifier;
};

export type EntriesIdentifier = [
  string | number | RegExp,
  | CSSObject
  | IdentifierHandler
  | Identifier,
][];

export type Identifier = RecordIdentifier | EntriesIdentifier;

export type EntriesModifier = [
  RegExp,
  (
    regExpExecArray: RegExpExecArray,
    parentNode: Root,
    context: ModifierContext,
  ) => Root | undefined,
][];

export type RecordModifier = {
  [k: string]: ModifierDefinition;
};

export type Modifier = RecordModifier;
export type ModifierDefinition = (
  parentNode: Root,
  context: ModifierContext,
) => Root | undefined;

export type IdentifierHandler = (
  regExpExecArray: RegExpExecArray,
  context: IdentifierContext,
) =>
  | CSSObject
  | undefined;
