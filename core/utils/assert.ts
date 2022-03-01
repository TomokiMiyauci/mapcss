import type { BlockDefinition, CSSDefinition, CSSObject } from "./../types.ts";
import {
  ChildNode,
  Declaration,
  isNumber,
  isObject,
  isString,
  prop,
  Rule,
} from "../../deps.ts";

const reValidSelector = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/;
export function isValidSelector(selector: string): selector is string {
  return reValidSelector.test(selector);
}

export function isBlockDefinition(value: unknown): value is BlockDefinition {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => isString(v) || isNumber(v));
}

export function isCSSObject(value: unknown): value is CSSObject {
  return isCSSDefinition(value) || isBlockDefinition(value);
}

export function isCSSDefinition(
  value: unknown,
): value is CSSDefinition {
  return isObject(value) && prop("type", value) === "css" &&
    isObject(prop("value", value));
}

export function isDeclaration(node: unknown): node is Declaration {
  return node instanceof Declaration;
}

export function isRule(node: unknown): node is Rule {
  return node instanceof Rule;
}
