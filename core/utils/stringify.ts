import type { RGBA } from "./parse.ts";

export function stringifyRGBA(
  { r, g, b, a }: Record<keyof RGBA, string | number>,
): string {
  return `rgba(${r},${g},${b},${a})`;
}

export function stringifyCustomProperty(
  property: string,
  prefix = "",
): string {
  return `--${prefix}${property}`;
}

export function stringifyVarFunction(...value: string[]) {
  return `var(${value.join(" ")})`;
}
