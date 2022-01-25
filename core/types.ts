export type CSSObject = Record<string, string>;

export type StaticRule = [
  string,
  CSSObject,
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

export type Preset = {
  name: string;
  rules: Rule[];
  theme: Theme;
};

export type Theme = {
  color: Record<string, string | Record<string, string>>;

  /** font size theme. [fontSize, lineHight] */
  fontSize: Record<string, [string, string]>;
};
