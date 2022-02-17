import type {
  CSSObject,
  CSSStatement,
  Declaration,
  DynamicSpecifierSet,
  EntriesSpecifier,
  PartialCSSStatement,
  RecordSpecifier,
  Specifier,
  SpecifierDefinition,
  StaticSpecifierSet,
} from "./../types.ts";
import {
  isFunction,
  isNumber,
  isObject,
  isRegExp,
  isString,
  prop,
} from "../../deps.ts";

export function isCSSObject(value: unknown): value is CSSObject {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => isString(v) || isNumber(v));
}

export function isPartialCSSStatement(
  value: unknown,
): value is PartialCSSStatement {
  if (!isObject(value)) return false;
  return "cssObject" in value && isCSSObject(prop("cssObject", value));
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
  set: StaticSpecifierSet | DynamicSpecifierSet,
): set is DynamicSpecifierSet {
  return isRegExp(set[0]);
}

export function isStringSpecifierSet(
  set: StaticSpecifierSet | DynamicSpecifierSet,
): set is StaticSpecifierSet {
  return isString(set[0]);
}

const reValidSelector = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/;
export function isValidSelector(selector: string): selector is string {
  return reValidSelector.test(selector);
}

export function isDeclaration(value: unknown): value is Declaration {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => isString(v) || isNumber(v));
}

export function isCSSStatement(value: unknown): value is CSSStatement {
  if (!isObject(value)) return false;
  const type = prop("type", value);

  return isString(type) && ["ruleset", "groupAtRule"].includes(type);
}

export function isSpecifierDefinition(
  value: unknown,
): value is SpecifierDefinition {
  if (isDeclaration(value) || isCSSStatement(value) || isFunction(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    if (value.every(isDeclaration) || value.every(isCSSStatement)) {
      return true;
    }
  }
  return false;
}
