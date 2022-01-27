import { isUndefined, propPath } from "../../deps.ts";
import type { Theme } from "../types.ts";

type ResolveTheme<Scope extends PropertyKey, P extends PropertyKey> = {
  /** theme scopes */
  scope: Scope;

  /** path to theme */
  path: P;
};

/** resolve theme via propPath safety */
export function resolveTheme<
  T extends Theme = Theme,
  Scope extends PropertyKey = PropertyKey,
  Path extends PropertyKey = PropertyKey,
>(
  theme: T,
  { scope, path }: ResolveTheme<Scope, Path>,
): T[Scope][Path] | void {
  const prop = propPath([scope, path], theme);
  if (!isUndefined(prop)) {
    return prop as T[Scope][Path];
  }
}
