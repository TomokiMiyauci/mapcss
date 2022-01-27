import { resolveTheme } from "../../core/utils/resolver.ts";
import { isNumber, isString, isStringOrNumber } from "../../deps.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule, RuleHandler } from "../../core/types.ts";

const resolveWidthString: RuleHandler = ([, path], { theme }) => {
  const width = resolveTheme(theme as PresetTwTheme, { scope: "width", path });
  if (isString(width) || isNumber(width)) {
    return {
      width,
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

const handleMinWidth: RuleHandler = ([, path], { theme }) => {
  const minWidth = resolveTheme(theme as PresetTwTheme, {
    scope: "minWidth",
    path,
  });
  if (isString(minWidth)) {
    return {
      "min-width": minWidth,
    };
  }
};

export const minWidths: Rule[] = [
  [/^min-w-(.+)$/, handleMinWidth],
];

const handleMaxWidth: RuleHandler = ([, path], { theme }) => {
  const maxWidth = resolveTheme(theme as PresetTwTheme, {
    scope: "maxWidth",
    path,
  });

  if (isStringOrNumber(maxWidth)) {
    return { "max-width": maxWidth };
  }
};

export const maxWidths: Rule[] = [
  [/^max-w-(.+)$/, handleMaxWidth],
];

const handleHeightNumber: RuleHandler = ([, path]) => {
  const number = Number(path);
  if (Number.isNaN(number)) return;
  if (!number) {
    return {
      height: "0px",
    };
  }

  return {
    height: `${number / 4}rem`,
  };
};

const handleHeightFraction: RuleHandler = ([, numerator, denominator]) => {
  const _numerator = Number(numerator);
  const _denominator = Number(denominator);

  const number = _numerator / _denominator;
  if (!Number.isFinite(number)) return;
  return {
    height: `${(number * 100)}%`,
  };
};

const handleHeight: RuleHandler = ([, path], { theme }) => {
  const height = resolveTheme(theme as PresetTwTheme, {
    scope: "height",
    path,
  });
  if (isStringOrNumber(height)) {
    return {
      height,
    };
  }
};

export const heights: Rule[] = [
  [/^h-([\d.]+)$/, handleHeightNumber],
  [/^h-(\d+)\/(\d+)$/, handleHeightFraction],
  [/^h-(.+)$/, handleHeight],
];

export {
  handleHeight,
  handleHeightFraction,
  handleHeightNumber,
  handleMaxWidth,
  handleMinWidth,
  resolveWidthString,
};
