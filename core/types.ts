export type CSSObject = Record<string, string | number>;

export type StaticRule = [
  string,
  CSSObject,
];

export type ModifierHandler = (
  match: string,
  context: ModifierContext,
) => Partial<ModifierResult> | void;

export type StaticModifier = [
  string,
  ModifierHandler,
];

export type RuleHandler = (
  match: RegExpMatchArray,
  context: RuleContext,
) => CSSObject | void;

export type DynamicRule = [
  RegExp,
  RuleHandler,
];

export interface RuleContext {
  theme: Theme;
}

export type Rule = StaticRule | DynamicRule;

export type Modifier = StaticModifier;

export type Preset = {
  name: string;
  rules: Rule[];
  theme: Theme;
  modifiers: Modifier[];
};

export interface ModifierContext {
  theme: Theme;
}

export interface ModifierResult {
  identifier: string;

  rule: string;

  selector: (selector: string) => string;
}

export interface Theme {
  default: Record<PropertyKey, unknown>;
  [k: PropertyKey]: Record<PropertyKey, unknown>;
}
