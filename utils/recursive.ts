// This module is browser compatible.

import { isObject, mapEntries } from "./deps.ts";
import type { Tree } from "../core/types.ts";

export function recTransform<T, U>(
  object: Readonly<Record<PropertyKey, T>>,
  transformer: (
    value: T extends Record<PropertyKey, any> ? T[keyof T]
      : T,
  ) => U,
): Tree<U, string> {
  return mapEntries(
    object,
    (
      [key, value],
    ) => [
      key,
      isObject(value)
        ? recTransform(value as never, transformer)
        : transformer(value as never),
    ],
  );
}
