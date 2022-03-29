// This module is browser compatible.

export type {
  AcceptedPlugin,
  Node,
  Plugin as PostcssPlugin,
} from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/postcss.d.ts";
export { default as Root } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/root.js";
export { default as Declaration } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/declaration.js";
export { default as AtRule } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/at-rule.js";
export { default as Rule } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/rule.js";
export { default as postcss } from "https://deno.land/x/postcss_core@v1.0.0-beta.1/lib/postcss.js";
export { toAST } from "https://deno.land/x/postcss_js@v1.0.0-beta.4/mod.ts";
export {
  None,
  Some,
} from "https://deno.land/x/monads@v0.5.10/option/option.ts";
export type { Option } from "https://deno.land/x/monads@v0.5.10/option/option.ts";
export {
  isFunction,
  isLength0,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
import {
  isLength0,
  isObject,
  isUndefined,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
export type {
  SyncProcessor,
} from "https://esm.sh/postcss-selector-parser@6.0.9?pin=v66";
export { default as valueParser } from "https://esm.sh/postcss-value-parser@4.2.0";
export { default as selectorParser } from "https://esm.sh/postcss-selector-parser@v6.0.9";
export type {
  Properties as CSSProperties,
} from "https://esm.sh/csstype@3.0.11/index.d.ts?pin=v74";

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
export type Arrayable<T> = T | T[];
export { deepMerge } from "https://deno.land/std@0.122.0/collections/deep_merge.ts";
export { distinctBy } from "https://deno.land/std@0.125.0/collections/distinct_by.ts";
export function wrap<T>(val: T): T extends any[] ? T : T[] {
  return Array.isArray(val) ? val as never : [val] as never;
}

/** Alias for `Tuple` */
type IsTuple<T extends readonly unknown[]> = number extends T["length"] ? false
  : true;

/** take last element of `array` */
export function last<T extends readonly unknown[]>(
  value: T,
): IsTuple<T> extends true ? T[Minus<T["length"]>] : T[number] | undefined {
  return value.slice(-1)[0] as never;
}

export function init<T>(value: readonly T[]): T[] {
  return value.slice(0, -1);
}

/** safe accessor for first element */
export function head<T extends readonly unknown[]>(
  value: T,
): IsTuple<T> extends true ? T[0] : T[0] | undefined {
  return value[0];
}

/** take elements except head */
export function tail<T extends unknown>(val: readonly T[]): T[] {
  return val.slice(1, Infinity);
}

type ArrayOfLength<N extends number, C extends any[] = []> = C["length"] extends
  N ? C : ArrayOfLength<N, [...C, any]>;

type Minus<N extends number> = ArrayOfLength<N> extends [any, ...infer Rest]
  ? Rest["length"]
  : never;

/** check field is exist or not */
export function has(
  key: PropertyKey,
  object: object,
): boolean {
  return Object.hasOwnProperty.call(object, key);
}

export type PropPath<
  T extends Record<any, any>,
  P extends unknown[] | unknown,
> = P extends unknown[]
  ? P extends [infer X, ...infer Rest] ? PropPath<T[X], Rest> : T
  : T[P] | undefined;

/** safe get accessor deeply */
export function propPath(
  path: PropertyKey[],
  object: Record<PropertyKey, any>,
): unknown {
  const key = path[0];
  if (isUndefined(key)) return undefined;
  const rest = tail(path);
  if (isLength0(rest)) {
    return prop(key, object);
  }

  const nested = prop(key, object);

  if (has(key, object) && isObject(nested)) {
    return propPath(rest, nested);
  }
  return undefined;
}
