import { isUndefined, propPath } from "../../deps.ts";
import { axisMap, cornerMap, direction4Map } from "./mapping.ts";
import type { Axis, Corner, Dir } from "./types.ts";
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
    : T[P] | undefined;

export function resolveDirection(key: Dir | Axis): string[] | undefined {
  const _direction4Map = Object.entries(direction4Map).reduce(
    (acc, [key, value]) => {
      return { ...acc, [key]: [value] };
    },
    {} as Record<Dir, string[]>,
  );
  const dirAxisMap = { ...axisMap, ..._direction4Map };
  return dirAxisMap[key];
}

export function resolveCorner(key: Corner): string[] {
  return cornerMap[key];
}
