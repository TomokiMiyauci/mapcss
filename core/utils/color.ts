import type { RGBA } from "./parse.ts";
export function stringifyRGBA(
  { r, g, b, a }: Record<keyof RGBA, string | number>,
): string {
  return `rgba(${r},${g},${b},${a})`;
}
