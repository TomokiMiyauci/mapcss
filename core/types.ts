import type { Root } from "../deps.ts";

export type Tree<L, P extends PropertyKey = string | number> = {
  [k in P]: L | Tree<L>;
};

export type CSSDefinition = { type: "css"; value: Tree<string | number> };

export type CSSObject =
  | CSSDefinition
  | BlockDefinition;

export type SpecifierContext =
  & ThemeContext
  & {
    variablePrefix: string;

    /** The token as it
     *
     * example: `sm:text-red-500` -> `sm:text-red-500`
     */
    token: string;

    /** The token with `.` and escaped for selector.
     *
     * example: `text-red-500/[10]` -> `.text-red-500\\[10\\]`
     */
    className: string;
  };

export type ThemeContext = {
  theme: Theme;
  separator: string;
};

export type Preset = {
  name: string;
  specifierMap: SpecifierMap;
  theme: Theme;
  modifierMap: ModifierMap;
  syntaxes: Syntax[];
  postProcessor: PostProcessor[];
};

export type ModifierContext = ThemeContext & {
  modifier: string;
  path: string[];
};

export interface Theme {
  [k: string | number]: string | Theme;
}

export interface Config {
  specifierMap: SpecifierMap;
  modifierMap: ModifierMap;
  theme: Theme;
  presets: Preset[];
  separator: string;
  syntaxes: Syntax[];

  postProcess: PostProcessor[];

  /**
   * @default 'map-'
   */
  variablePrefix: string;

  /** Specifies a map of strings.
   * It is mainly used to reassign special characters.
   * @default charMap: { "_": " " }
   */
  charMap: Record<string, string>;
}

export type ModifierMap = Record<
  string | number,
  Modifier | ModifierDefinition
>;

export type SyntaxContext = {
  token: string;
  modifierRoots: string[];
  specifierRoots: string[];
};
export type ParseResult = {
  specifier: string;
  modifiers?: string[];
};

type Context = {
  variablePrefix: string;
};

export type Syntax = {
  name: string;
  fn: (context: SyntaxContext) => ParseResult | undefined;
};

export type PostProcessor = {
  name: string;
  fn: (
    rootNode: Root,
    context: Context,
  ) => Root;

  /** order of processor */
  order?: number;
};

/** User definition of CSS Block Declaration */
export type BlockDefinition = Record<string, string | number>;

export type SpecifierMap = {
  [k in string | number]: Specifier | CSSObject;
};

export type RecordSpecifier = {
  [k: string | number]: CSSObject | SpecifierHandler | Specifier;
};

export type EntriesSpecifier = [
  string | number | RegExp,
  | CSSObject
  | SpecifierHandler
  | Specifier,
][];

export type Specifier = RecordSpecifier | EntriesSpecifier;

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

export type SpecifierHandler = (
  regExpExecArray: RegExpExecArray,
  context: SpecifierContext,
) =>
  | CSSObject
  | undefined;
