import { Config } from "./types.ts";
import { deepMerge, mapEntries, wrap } from "./deps.ts";

/** merge two config.
 * if it exists arrayable property, the value will wrap array and merge.
 */
export function mergeConfig(a: Config, b: Config): Config {
  const arrayables = ["css", "extractor"];

  return deepMerge(wrapArray(a, arrayables), wrapArray(b, arrayables), {
    arrays: "merge",
  });
}

function wrapArray<T extends Record<PropertyKey, unknown>>(
  value: T,
  keys: string[],
): T {
  return mapEntries(value, ([key, value]) => {
    const v = keys.includes(key) ? wrap(value) : value;
    return [key, v];
  }) as T;
}
