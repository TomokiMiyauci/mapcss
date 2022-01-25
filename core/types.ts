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

export type DynamicRule = [
  RegExp,
  (
    match: RegExpMatchArray,
    context: RuleContext,
  ) => CSSObject | undefined,
];

export interface RuleContext {
  theme: Theme & Record<string, unknown>;
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
  theme: Theme & Record<string, unknown>;
}

export interface ModifierResult {
  identifier: string;

  rule: string;

  selector: (selector: string) => string;
}

export type Theme = {
  color: Record<string, string | Record<string, string>>;

  /** font size theme. [fontSize, lineHight] */
  fontSize: Record<string, [string, string]>;

  fontWeight: Record<string, number>;

  letterSpacing: Record<PropertyKey, string>;

  screen: Record<PropertyKey, string>;
};
