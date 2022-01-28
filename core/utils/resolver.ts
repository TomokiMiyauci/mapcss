import { isUndefined, propPath } from "../../deps.ts";
import { directionMap } from "./mapping.ts";
import type { Dir } from "./types.ts";
import type { Theme } from "../types.ts";

type ResolveTheme<
  Scope extends PropertyKey,
  P extends PropertyKey | PropertyKey[],
> = {
  /** theme scopes */
  scope: Scope;

  /** path to theme */
  path: P;
};

/** resolve theme via propPath safety */
export function resolveTheme<
  T extends Theme = Theme,
  Scope extends PropertyKey = PropertyKey,
  Path extends PropertyKey[] | PropertyKey = PropertyKey,
>(
  theme: T,
  { scope, path }: ResolveTheme<Scope, Path>,
): PropPath<T[Scope], Path> {
  const _ = Array.isArray(path) ? path : [path];
  const prop = propPath([scope, ..._], theme);
  if (!isUndefined(prop)) {
    return prop as never;
  }
  return undefined as never;
}

type PropPath<T extends Record<any, any>, P extends unknown[] | unknown> =
  P extends unknown[]
    ? P extends [infer X, ...infer Rest] ? PropPath<T[X], Rest> : T
    : T[P];

export function resolveDirection(key: Dir): string[] | undefined {
  return directionMap[key];
}
