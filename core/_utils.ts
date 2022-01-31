import { isString } from "../deps.ts";
import { escapeRegExp } from "./utils/escape.ts";
import type {
  CSSObject,
  DynamicRule,
  ModifierResult,
  Rule,
  StaticRule,
} from "./types.ts";

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

export function isDynamicRule(rule: Rule): rule is DynamicRule {
  return isRegExp(rule[0]);
}

export function isStaticRule(rule: Rule): rule is StaticRule {
  return !isRegExp(rule[0]);
}

export function isAtRule(
  cssStatement: AtRule | RuleSet,
): cssStatement is AtRule {
  return "identifier" in cssStatement;
}

export function isRuleSet(
  cssStatement: AtRule | RuleSet,
): cssStatement is RuleSet {
  return "declarationBlock" in cssStatement;
}

export type RuleSet = {
  selector: string;
  declarationBlock: CSSObject;
};

export type AtRule = Partial<ModifierResult> & {
  children: RuleSet;
};

type CSSStatement = RuleSet | AtRule;

export function constructCSS(
  cssStatement: CSSStatement,
): string {
  if (isRuleSet(cssStatement)) {
    const { selector, declarationBlock } = cssStatement;
    const escapedSelector = escapeRegExp(selector);

    return `.${escapedSelector}${cssDeclarationBlock(declarationBlock)}`;
  }

  const { children: { selector, declarationBlock }, identifier, rule } =
    cssStatement;

  const escapedSelector = escapeRegExp(selector);
  const _selector = cssStatement.selector?.(escapedSelector) ?? escapedSelector;
  const declaration = cssDeclarationBlock(declarationBlock);

  const children = `${_selector}${declaration}`;
  return constructAtRule({ identifier, rule, children });
}

export function cssDeclarationBlock(cssObject: CSSObject): string {
  const content = Object.entries(cssObject).reduce((acc, [property, value]) => {
    const declaration = cssDeclaration({ property, value });
    return `${acc}${declaration}`;
  }, "");

  return bracket(content);
}

export function bracket<T extends string>(value: T): `{${T}}` {
  return `{${value}}`;
}

export function paren<T extends string>(value: T): `(${T})` {
  return `(${value})`;
}

export function constructAtRule(
  { identifier, rule, children }: Pick<AtRule, "identifier" | "rule"> & {
    children: string;
  },
): string {
  if (isString(identifier) && isString(rule)) {
    return `@${identifier} ${rule}{
${children}
}`;
  }
  return children;
}

export function cssDeclaration(
  { property, value }: {
    property: string;
    value: string | number;
  },
  { middleSeparator = ":", endSeparator = ";" }: Partial<{
    middleSeparator: string;
    endSeparator: string;
  }> = {},
): string {
  return `${property}${middleSeparator}${value}${endSeparator}`;
}

export function reduceValue(value: string | number) {
  const reducer = (acc: {}, cur: string) => ({ ...acc, [cur]: value });
  return reducer;
}

export function constructVar(value: string, prefix = ""): string {
  return `--${prefix}${value}`;
}
