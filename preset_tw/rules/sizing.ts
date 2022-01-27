import { resolveTheme } from "../../core/utils/resolver.ts";
import { isNumber, isString } from "../../deps.ts";
import type { Rule, RuleHandler } from "../../core/types.ts";

const resolveWidthString: RuleHandler = ([, body], { theme }) => {
  const prop = resolveTheme(body, theme, { scopes: ["width"] });
  if (isString(prop) || isNumber(prop)) {
    return {
      width: prop,
    };
  }
};

export const Widths: Rule[] = [
  [/^w-([\d.]+)$/, ([, body]) => {
    const number = Number(body);

    if (Number.isNaN(number)) return;

    const unit = number ? "rem" : "px";
    return {
      width: `${(number / 4)}${unit}`,
    };
  }],

  [/^w-(\d+)\/(\d+)$/, ([, numerator, denominator]) => {
    const _numerator = Number(numerator);
    const _denominator = Number(denominator);

    const number = _numerator / _denominator;
    if (!Number.isFinite(number)) return;

    return {
      width: `${number * 100}%`,
    };
  }],

  [/^w-(.+)$/, resolveWidthString],
];

export { resolveWidthString };
