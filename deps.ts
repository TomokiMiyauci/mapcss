export {
  isEmptyObject,
  isFunction,
  isLength0,
  isNumber,
  isObject,
  isString,
  isSymbol,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
import {
  isLength0,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
export { deepMerge } from "https://deno.land/std@0.122.0/collections/deep_merge.ts";
export { associateWith } from "https://deno.land/std@0.123.0/collections/associate_with.ts";
export { mapEntries } from "https://deno.land/std@0.123.0/collections/map_entries.ts";
export { filterValues } from "https://deno.land/std@0.123.0/collections/filter_values.ts";
export { distinctBy } from "https://deno.land/std@0.125.0/collections/distinct_by.ts";
export { union } from "https://deno.land/std@0.125.0/collections/union.ts";
export { sortBy } from "https://deno.land/std@0.125.0/collections/sort_by.ts";
export { curry } from "https://deno.land/x/curry@v1.0.0/mod.ts";
export {
  None,
  type Option,
  Some,
} from "https://deno.land/x/monads@v0.5.10/option/option.ts";
export {
  type Either,
  Left,
  Right,
} from "https://deno.land/x/monads@v0.5.10/either/either.ts";
export { isUndefined };
export type {
  ChildNode,
  ChildProps,
  DeclarationProps,
  Plugin as PostcssPlugin,
} from "https://deno.land/x/postcss@8.4.6/lib/postcss.d.ts";
import Rule from "https://deno.land/x/postcss@8.4.6/lib/rule.js";
import Declaration from "https://deno.land/x/postcss@8.4.6/lib/declaration.js";
import AtRule from "https://deno.land/x/postcss@8.4.6/lib/at-rule.js";
import Root from "https://deno.land/x/postcss@8.4.6/lib/root.js";
import postcss from "https://deno.land/x/postcss@8.4.6/lib/postcss.js";
export { AtRule, Declaration, postcss, Root, Rule };

export function isStringOrNumber(value: unknown): value is string | number {
  return isString(value) || isNumber(value);
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/** check field is exist or not */
export function has(
  key: PropertyKey,
  object: object,
): boolean {
  return Object.hasOwnProperty.call(object, key);
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

/** take elements except head */
export function tail<T extends unknown>(val: readonly T[]): T[] {
  return val.slice(1, Infinity);
}

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

/** Alias for `Tuple` */
type IsTuple<T extends readonly unknown[]> = number extends T["length"] ? false
  : true;

type ArrayOfLength<N extends number, C extends any[] = []> = C["length"] extends
  N ? C : ArrayOfLength<N, [...C, any]>;

type Minus<N extends number> = ArrayOfLength<N> extends [any, ...infer Rest]
  ? Rest["length"]
  : never;

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

export type PropPath<
  T extends Record<any, any>,
  P extends unknown[] | unknown,
> = P extends unknown[]
  ? P extends [infer X, ...infer Rest] ? PropPath<T[X], Rest> : T
  : T[P] | undefined;

/** High precision round */
export function roundTo(num: number, digit: number): number {
  return +(Math.round(Number(num + `e+${digit}`)) + `e-${digit}`);
}

export type Arrayable<T> = T | T[];

export type Optional<
  T extends Record<PropertyKey, unknown>,
  K extends PropertyKey,
> =
  & {
    [k in K]?: T[k];
  }
  & { [k in keyof Omit<T, K>]: T[k] };

export type ReplaceKeys<U, T, Y> = {
  [k in keyof U]: k extends keyof Y ? Y[k]
    : k extends Exclude<keyof U, T> ? U[k]
    : never;
};

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
