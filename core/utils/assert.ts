// This module is browser compatible.

import type {
  CSSDefinition,
  CSSObject,
  DeclBlock,
  DeclBlockDefinition,
} from "./../types.ts";
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

export function isDeclBlock(value: unknown): value is DeclBlock {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => isString(v) || isNumber(v));
}

export function isCSSObject(value: unknown): value is CSSObject {
  return isCSSDefinition(value) || isDeclBlockDefinition(value) ||
    isDeclBlock(value);
}

export function isCSSDefinition(
  value: unknown,
): value is CSSDefinition {
  return isObject(value) && prop("type", value) === "css" &&
    isObject(prop("value", value));
}
export function isDeclBlockDefinition(
  value: unknown,
): value is DeclBlockDefinition {
  return isObject(value) && prop("type", value) === "decl" &&
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
