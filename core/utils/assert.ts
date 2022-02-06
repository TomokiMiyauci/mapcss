import type {
  AtRule,
  CSSObject,
  CSSObjectSet,
  EntriesSpecifier,
  RecordSpecifier,
  RegExpSpecifierSet,
  RuleSet,
  Specifier,
  StringSpecifierSet,
} from "./../types.ts";
import { isObject, isRegExp, isString } from "../../deps.ts";

export function isCSSObject(value: unknown): value is CSSObject {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => !isObject(v));
}

export function isCSSObjectSet(value: unknown): value is CSSObjectSet {
  if (!isObject(value)) return false;

  return Array.isArray(value) && isCSSObject(value[0]) && isString(value[1]);
}

export function isEntriesSpecifier(
  specifier: Specifier,
): specifier is EntriesSpecifier {
  return Array.isArray(specifier);
}

export function isRecordSpecifier(
  specifier: Specifier,
): specifier is RecordSpecifier {
  return !Array.isArray(specifier);
}

export function isRegExpSpecifierSet(
  set: StringSpecifierSet | RegExpSpecifierSet,
): set is RegExpSpecifierSet {
  return isRegExp(set[0]);
}

export function isStringSpecifierSet(
  set: StringSpecifierSet | RegExpSpecifierSet,
): set is StringSpecifierSet {
  return isString(set[0]);
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

const reValidSelector = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/;
export function isValidSelector(selector: string): selector is string {
  return reValidSelector.test(selector);
}
