import { isCSSObject } from "./assert.ts";
import { deepMerge } from "../../deps.ts";
import type { CSSNestedModule, CSSObject, CSSStatement } from "../types.ts";
import type { FilledRGBA, RGBA } from "./parse.ts";

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

export function quoter(value: number): number {
  return value / 4;
}

export function customProperty(
  property: string,
  prefix = "",
): string {
  return `--${prefix}${property}`;
}

export function varFn(customPropertyName: string): string {
  return `var(${customPropertyName})`;
}

export function unit(unit: "%" | "deg" | "ms" | "rem") {
  return (value: string | number): string => `${value}${unit}`;
}

export function multiple(a: number): (b: number) => number {
  return (b: number): number => a * b;
}

/** High precision round */
export function roundTo(number: number, digit: number): number {
  return Number(number.toFixed(digit));
}

export function roundN(digit: number): (number: number) => number {
  return (number: number): number => roundTo(number, digit);
}

export function rgbFn(
  { r, g, b, a }: Record<keyof RGBA, number | string>,
): string {
  const _r = shortDecimal(r);
  const _g = shortDecimal(g);
  const _b = shortDecimal(b);
  const _a = shortDecimal(a);
  return `rgb(${_r} ${_g} ${_b}/${_a})`;
}

export function completionRGBA(
  alpha: number,
  asDefault = false,
): (rgba: RGBA) => FilledRGBA {
  return ({ r, g, b, a }: RGBA): FilledRGBA => {
    const _a = asDefault ? a ?? alpha : alpha;
    return { r, g, b, a: _a };
  };
}

export function cssStatements2CSSNestedModule(
  cssStatements: CSSStatement[],
): CSSNestedModule {
  return cssStatements.reduce(
    (
      acc,
      { basicSelector, pseudo = "", combinator = "", atRules = [], cssObject },
    ) => {
      const selector = `${basicSelector}${pseudo}${combinator}`;
      const nestedModule = atRules.reduceRight((acc, atRule) => {
        return { [atRule]: acc };
      }, { [selector]: cssObject } as CSSNestedModule);
      return deepMerge(acc, nestedModule);
    },
    {},
  );
}

export function stringifyCSSNestedModule(
  cssNestedModule: CSSNestedModule,
  compress = true,
  _selectors: string[] = [],
): string {
  const result = Object.entries(cssNestedModule).map(
    ([selector, nestedModuleOrCSSObject]) => {
      const selectors = [..._selectors, selector];

      if (isCSSObject(nestedModuleOrCSSObject)) {
        const dec = stringifyDeclaration(nestedModuleOrCSSObject);
        return selectors.reduceRight(
          (acc, cur) => {
            return `${cur}{${acc}}`;
          },
          dec,
        );
      }
      return stringifyCSSNestedModule(
        nestedModuleOrCSSObject,
        compress,
        selectors,
      );
    },
  );

  return result.join("\n");
}

export function stringifyDeclaration(
  cssObject: Readonly<CSSObject>,
  compress = true,
): string {
  const content = Object.entries(cssObject).reduce(
    (acc, [property, value]) =>
      `${acc}${withJoin(property, value, { middleOf: compress ? `:` : ": " })}`,
    "",
  );
  return content;
}

export function withJoin(
  a: string | number,
  b: string | number,
  { startOf = "", middleOf = ":", endOf = ";" }: Partial<{
    startOf: string;
    middleOf: string;
    endOf: string;
  }> = { startOf: "", middleOf: ":", endOf: ";" },
): string {
  return `${startOf}${a}${middleOf}${b}${endOf}`;
}

export function atRule(
  identifier: string,
  rule: string,
  { raw }: { raw: boolean } = { raw: false },
): string {
  const rawRule = raw ? rule : `(${rule})`;
  return `@${identifier} ${rawRule}`;
}

export function cssMediaRule(rule: string): string {
  return atRule("media", rule);
}
