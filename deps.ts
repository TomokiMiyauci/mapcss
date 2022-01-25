export {
  isNumber,
  isString,
  isSymbol,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
import {
  isLength0,
  isObject,
  isUndefined,
} from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
export { deepMerge } from "https://deno.land/std@0.122.0/collections/deep_merge.ts";

/** check field is exist or not */
function has(
  key: PropertyKey,
  object: object,
): boolean {
  return Object.hasOwnProperty.call(object, key);
}

/** safe get accessor */
function prop(key: PropertyKey, object: object): unknown {
  return (object as never)[key];
}

/** take elements except head */
function tail<T extends unknown>(val: readonly T[]): T[] {
  return val.slice(1, Infinity);
}

/** safe get accessor deeply */
export function propPath(path: PropertyKey[], object: object): unknown {
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
