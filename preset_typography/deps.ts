// This module is browser compatible.

export {
  default as selectorParser,
} from "https://esm.sh/postcss-selector-parser@v6.0.9?pin=v74";
export type {
  Node as SelectorNode,
  SyncProcessor,
} from "https://esm.sh/postcss-selector-parser@v6.0.9";
export {
  isEmptyObject,
  isLength0,
  isObject,
  isString,
  isUndefined,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
export { deepMerge } from "https://deno.land/std@0.122.0/collections/deep_merge.ts";
export { default as Root } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/root.js";
export { default as Rule } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/rule.js";
export {
  toAST,
  toObject,
} from "https://deno.land/x/postcss_js@v1.0.0-beta.4/mod.ts";
export { color } from "../common/theme.ts";

interface Chain<T> {
  map<U>(fn: (val: T) => U): Chain<U>;
  unwrap(): T | never;
}

export function chain<T>(val: T): Chain<T> {
  return {
    map: <U>(fn: (val: T) => U) => chain(fn(val)),
    unwrap: (): T => val,
  };
}

/** safe get accessor */
export function prop<
  T extends PropertyKey,
  U extends Record<PropertyKey, any>,
>(
  key: T,
  object: U,
): U[T] extends U[T] ? U[T] | undefined : unknown {
  return (object)[key];
}
