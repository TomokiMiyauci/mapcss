export type CSSObject = Record<string, string>;

export type StaticRule = [
  string,
  CSSObject,
];

export type DynamicRule = [
  RegExp,
  (match: RegExpMatchArray) => CSSObject,
];

export type Rule = StaticRule | DynamicRule;

export type Preset = {
  name: string;
  rules: Rule[];
};
