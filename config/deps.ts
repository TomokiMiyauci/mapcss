// This module is browser compatible.

export { isObject } from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
export { distinctBy } from "https://deno.land/std@0.132.0/collections/distinct_by.ts";
export type Arrayable<T> = T | T[];
export function wrap<T>(val: T): T extends any[] ? T : T[] {
  return Array.isArray(val) ? val as never : [val] as never;
}
