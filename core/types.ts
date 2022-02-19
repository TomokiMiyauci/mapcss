import type { Arrayable } from "../deps.ts";

export type CSSNestedModule = {
  [k: string]: CSSNestedModule | Declaration;
};

export type SpecifierContext =
  & ThemeContext
  & {
    variablePrefix: string;
    token: string;
  };

export type ThemeContext = {
  theme: Theme;
  separator: string;
};

export type SpecifierHandler = (
  arr: RegExpExecArray,
  context: SpecifierContext,
) => Arrayable<Declaration> | Arrayable<CSSStatement> | undefined;

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

export type GlobalModifierHandler = (
  cssStatement: Required<CSSStatement>,
  context: ModifierContext,
) => Required<CSSStatement> | undefined;

export type LocalModifierHandler = (
  declaration: RuleSet["declaration"],
  context: ModifierContext,
) => RuleSet["declaration"] | undefined;

export type GlobalModifier = {
  type: "global";
  fn: GlobalModifierHandler;
};

export type LocalModifier = {
  type: "local";
  fn: LocalModifierHandler;
};

export type ModifierMap = Record<
  string | number,
  GlobalModifier | LocalModifier
>;

type SyntaxContext = {
  token: string;
  globalModifierNames: string[];
  localModifierNames: string[];
  specifierRoots: string[];
};
type ParseResult = {
  specifier: string;
  globalModifiers?: string[];
  localModifiers?: string[];
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
    cssStatements: Required<CSSStatement>[],
    context: Context,
  ) => Required<CSSStatement>[];

  /** order of processor */
  order?: number;
};

export type Declaration = Record<string, string | number>;
export type CSSStatement = GroupAtRule | RuleSet;

type BaseRule = {
  order?: number;
};

export type AtRule = {
  type: "atRule";
  identifier: string;
  rule?: string;
  children?: NestedRecord;
} & BaseRule;

type NestedRecord = {
  [k: string]: string | NestedRecord;
};

export type GroupAtRule = {
  type: "groupAtRule";
  identifier: string;
  rule: string;
  children: GroupAtRule | RuleSet;
} & BaseRule;

export type Selector = {
  basic: string;
  combinator: string;
  pseudo: string;
};

export type RuleSet = {
  type: "ruleset";
  selector?: Partial<Selector>;
  declaration: Declaration;
} & BaseRule;

export type SpecifierMap = {
  [k in string | number]:
    | SpecifierDefinition
    | Specifier;
};

export type RecordSpecifier = {
  [k: string | number]:
    | SpecifierDefinition
    | Specifier;
};
export type EntriesSpecifier = [
  string | number | RegExp,
  | SpecifierDefinition
  | Specifier,
][];

export type Specifier = RecordSpecifier | EntriesSpecifier;

export type SpecifierDefinition =
  | Arrayable<Declaration>
  | Arrayable<CSSStatement>
  | ((regExpExecArray: RegExpExecArray, context: SpecifierContext) =>
    | Arrayable<Declaration>
    | Arrayable<CSSStatement>
    | undefined);
