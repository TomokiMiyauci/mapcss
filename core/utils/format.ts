/** format numeric to `#.##`
 * ```ts
 * import { shortDecimal } from "https://deno.land/x/mapcss@$VERSION/core/utils/format.ts"
 * import { expect } from "https://deno.land/x/unitest/mod.ts"
 * expect(shortDecimal("0.5")).toBe(".5")
 * expect(shortDecimal("0.05")).toBe(".05")
 * expect(shortDecimal("1.5")).toBe("1.5")
 * ```
 */
export function shortDecimal(value: string | number): string {
  return String(value).replace(/^0(.\d+)$/, "$1");
}

export function ratio(value: number): number {
  return value / 100;
}

export function customProperty(
  property: string,
  prefix = "",
): string {
  return `--${prefix}${property}`;
}

export function unit(unit: "%" | "deg" | "ms") {
  return (value: string | number): string => `${value}${unit}`;
}
