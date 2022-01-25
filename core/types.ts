export type CSSObject = Record<string, string>;

export type StaticRule = [
  string,
  CSSObject,
];

export type DynamicRule = [
  RegExp,
  (
    match: RegExpMatchArray,
    theme: Theme & Record<string, unknown>,
  ) => CSSObject | undefined,
];

export type Rule = StaticRule | DynamicRule;

export type Preset = {
  name: string;
  rules: Rule[];
  theme: Theme;
};

export type Theme = {
  color: Record<string, string | Record<string, string>>;
};
