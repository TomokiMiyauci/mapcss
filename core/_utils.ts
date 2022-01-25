import type { CSSObject, DynamicRule, Rule, StaticRule } from "./types.ts";

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

export function isDynamicRule(rule: Rule): rule is DynamicRule {
  return isRegExp(rule[0]);
}

export function isStaticRule(rule: Rule): rule is StaticRule {
  return !isRegExp(rule[0]);
}

export function constructCSS(rules: StaticRule[]): string {
  return rules.reduce((acc, [selector, cssObject]) => {
    const block = cssDeclarationBlock(cssObject);
    const cssDeclaration = `.${selector}${block}`;
    return acc.concat(cssDeclaration);
  }, [] as string[]).join("\n");
}

export function cssDeclarationBlock(cssObject: CSSObject): string {
  const content = Object.entries(cssObject).reduce((acc, [property, value]) => {
    const declaration = cssDeclaration({ property, value });
    return `${acc}${declaration}`;
  }, "");

  return `{${content}}`;
}

export function cssDeclaration(
  { property, value }: {
    property: string;
    value: string;
  },
  { middleSeparator = ":", endSeparator = ";" }: Partial<{
    middleSeparator: string;
    endSeparator: string;
  }> = {},
): string {
  return `${property}${middleSeparator}${value}${endSeparator}`;
}
