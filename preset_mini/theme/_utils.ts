import { propPath } from "../../deps.ts";
import type { Theme } from "../../core/types.ts";

export function colorResolver(
  theme: Theme & Record<string, unknown>,
  colors: string[],
): unknown {
  return propPath(colors, theme.color);
}
