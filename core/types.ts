export type CSSObject = Record<string, string | number>;

export interface SpecifierContext {
  theme: Theme;
  separator: string;
}

export type Specifier = RecordSpecifier | EntriesSpecifier;

export type RecordSpecifier = {
  [k: string]: CSSObject | Specifier;
};

export type RegExpSpecifierHandler = (
  arr: RegExpExecArray,
  context: SpecifierContext,
) => CSSObject | undefined;

export type EntriesSpecifier = (StringSpecifierSet | RegExpSpecifierSet)[];
export type RegExpSpecifierSet = [
  RegExp,
  | Specifier
  | RegExpSpecifierHandler,
];
export type StringSpecifierSet = [string | number, CSSObject | Specifier];

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
}

export type RuleSet = {
  selector: string;
  declaration: CSSObject;
};

export type SerializedRuleSet = Record<keyof RuleSet, string>;

export type AtRule = Partial<ModifierResult> & {
  children: RuleSet;
};

export type CSSStatement = RuleSet | AtRule;

export type GlobalModifierHandler = (
  serializedRuleSet: SerializedRuleSet,
  context: ModifierContext,
) => Partial<SerializedRuleSet & { ruleSet: (ruleSet: string) => string }>;

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
