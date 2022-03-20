import type { BlockDefinition, CSSDefinition, CSSObject } from "./../types.ts";
import {
  AtRule,
  Declaration,
  isNumber,
  isObject,
  isString,
  Node,
  prop,
  Root,
  Rule,
} from "../deps.ts";

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

export function isDeclaration(node: Node): node is Declaration {
  return node.type === "decl";
}

export function isRule(node: Node): node is Rule {
  return node.type === "rule";
}

export function isAtRule(node: Node): node is AtRule {
  return node.type === "atrule";
}

export function isRoot(node: unknown): node is Root {
  return isObject(node) && prop("type", node) === "root";
}
