import type {
  CSSStatement,
  Declaration,
  SpecifierDefinition,
} from "./../types.ts";
import { isFunction, isNumber, isObject, isString, prop } from "../../deps.ts";

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
