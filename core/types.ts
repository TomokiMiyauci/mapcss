export type CSSObject = Record<string, string | number>;

export type PartialCSSStatement = Option<CSSStatement, "basicSelector">;

type Option<T extends Record<PropertyKey, unknown>, K extends PropertyKey> =
  & {
    [k in K]?: T[k];
  }
  & { [k in keyof Omit<T, K>]: T[k] };

export type CSSStatement = {
  basicSelector: string;
  combinator?: string;
  pseudo?: string;
  atRules?: string[];
  cssObject: CSSObject;
};

export type CSSNestedModule = {
  [k: string]: CSSNestedModule | CSSObject;
};

export interface SpecifierContext {
  theme: Theme;
  separator: string;
  variablePrefix: string;
}

export type Specifier = RecordSpecifier | EntriesSpecifier;

export type RecordSpecifier = {
  [k: string]:
    | CSSObject
    | PartialCSSStatement
    | SpecifierHandler
    | Specifier;
};

export type SpecifierHandler = (
  arr: RegExpExecArray,
  context: SpecifierContext,
) => CSSObject | PartialCSSStatement | undefined;

export type EntriesSpecifier = (StaticSpecifierSet | DynamicSpecifierSet)[];
export type DynamicSpecifierSet = [
  RegExp | string | number,
  SpecifierHandler,
];
export type StaticSpecifierSet = [
  string | number,
  | CSSObject
  | PartialCSSStatement
  | Specifier,
];

export type Preset = {
  name: string;
  specifierMap: SpecifierMap;
  theme: Theme;
  modifierMap: ModifierMap;
  syntaxes: Syntax[];
};

export interface ModifierContext {
  theme: Theme;
  modifier: string;
}

export interface ModifierResult {
  identifier: string;

  rule: string;

  selector: (selector: string) => string;
}

export type SpecifierMap = Record<string | number, Specifier | CSSObject>;

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

  postProcess: {
    name: string;
    fn: (cssStatements: Required<CSSStatement>[]) => Required<CSSStatement>[];
  }[];

  /**
   * @default 'map-'
   */
  variablePrefix: string;
}

type OverrideCSSStatement = {
  atRule: string;
  basicSelector: string;
  pseudo: string;
};

export type GlobalModifierHandler = (
  cssStatement: PartialCSSStatement,
  context: ModifierContext,
) => Partial<OverrideCSSStatement>;

export type LocalModifierHandler = (
  cssObject: CSSObject,
  context: ModifierContext,
) => CSSObject | undefined;

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

export type Syntax = {
  name: string;
  fn: (context: SyntaxContext) => ParseResult | undefined;
};

export type PostProcessor = {
  name: string;
  fn: (
    cssStatements: Required<CSSStatement>[],
  ) => Required<CSSStatement>[];
};
