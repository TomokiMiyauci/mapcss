import {
  isNumber,
  isString,
  isStringOrNumber,
  isUndefined,
} from "../../deps.ts";
import {
  resolveCorner,
  resolveDirection,
  resolveTheme,
} from "../../core/utils/resolver.ts";
import { constructVar, reduceValue } from "../../core/_utils.ts";
import { hex2RGBA, parseNumeric } from "../../core/utils/parse.ts";
import { stringifyRGBA, stringifyVar } from "../../core/utils/color.ts";
import { px } from "../../core/utils/unit.ts";
import { VARIABLE_PREFIX } from "../_utils.ts";
import type { Corner, Dir } from "../../core/utils/types.ts";
import type { Rule, RuleHandler } from "../../core/types.ts";
import type { PresetTwTheme } from "../theme/types.ts";

const BORDER_WIDTH = "border-width";

const handleBorderWidthDirection: RuleHandler = (
  [, direction, num],
  { theme },
) => {
  const directions = resolveDirection(direction as Dir);

  if (isUndefined(directions)) return;
  const number = isString(num)
    ? (() => {
      const number = parseNumeric(num);
      if (isUndefined(number)) return;
      return `${number}px`;
    })()
    : resolveTheme(theme as PresetTwTheme, {
      scope: "borderWidth",
      path: "DEFAULT",
    });
  if (isUndefined(number)) return;

  const borderWidths = directions.map((direction) =>
    `border-${direction}-width`
  );

  return borderWidths.reduce(reduceValue(number), {});
};

const handleBorderWidthNumber: RuleHandler = ([, length]) => {
  const number = parseNumeric(length);
  if (isUndefined(number)) return;

  return {
    [BORDER_WIDTH]: `${number}px`,
  };
};

export const borderWidths: Rule[] = [
  [/^border$/, (_, { theme }) => {
    const borderWidth = resolveTheme(theme as PresetTwTheme, {
      scope: "borderWidth",
      path: "DEFAULT",
    });
    if (isString(borderWidth)) {
      return { [BORDER_WIDTH]: borderWidth };
    }
  }],
  [/^border-([\d.]+)$/, handleBorderWidthNumber],
  [/^border-([xytrbl])(?:-([\d.]+))?$/, handleBorderWidthDirection],
];

const handleBorderColorOpacity: RuleHandler = (
  [, dir, path, op],
  { theme },
) => {
  const _dir = dir as Dir | undefined;
  const c = path.split("-");
  const rawColor = resolveTheme(theme as PresetTwTheme, {
    scope: "color",
    path: c,
  }) as unknown;

  const number = parseNumeric(op);

  if (!isString(rawColor) || isUndefined(number)) return;

  const directions = isUndefined(_dir) ? [""] : resolveDirection(_dir) ?? [];
  const maybeRGBA = hex2RGBA(rawColor);
  const borderColors = directions.map((dir) =>
    ["border", dir, "color"].filter(Boolean).join("-")
  );

  if (maybeRGBA) {
    const { r, g, b } = maybeRGBA;
    const opacity = constructVar("border-opacity", VARIABLE_PREFIX);
    const opacityMap = { [opacity]: number / 100 };

    const rgba = stringifyRGBA({
      r,
      g,
      b,
      a: stringifyVar(opacity),
    });
    return { ...opacityMap, ...borderColors.reduce(reduceValue(rgba), {}) };
  }
};

const handleBorderColor: RuleHandler = ([, dir, path], { theme }) => {
  const _dir = dir as Dir | undefined;
  const c = path.split("-");
  const rawColor = resolveTheme(theme as PresetTwTheme, {
    scope: "color",
    path: c,
  }) as unknown;

  if (!isString(rawColor)) return;

  const directions = isUndefined(_dir) ? [""] : resolveDirection(_dir) ?? [];
  const maybeRGBA = hex2RGBA(rawColor);
  const borderColors = directions.map((dir) =>
    ["border", dir, "color"].filter(Boolean).join("-")
  );

  if (maybeRGBA) {
    const { r, g, b, a } = maybeRGBA;
    const opacity = constructVar("border-opacity", VARIABLE_PREFIX);
    const opacityMap = isNumber(a) ? { [opacity]: a } : {};

    const rgba = stringifyRGBA({
      r,
      g,
      b,
      a: isNumber(a) ? stringifyVar(opacity) : 1,
    });
    return { ...opacityMap, ...borderColors.reduce(reduceValue(rgba), {}) };
  }

  return borderColors.reduce(reduceValue(rawColor), {});
};

export const borderColors: Rule[] = [
  [/^border(?:-([xytrbl]))?-(.+)\/(\d+)$/, handleBorderColorOpacity],
  [/^border(?:-([xytrbl]))?-(.+)$/, handleBorderColor],
];

const borderRadiusThemeOptions = {
  scope: "borderRadius",
  path: "DEFAULT",
} as const;

const handleBorderRadiusCorner: RuleHandler = ([, corner], { theme }) => {
  const borderRadius = resolveTheme(
    theme as PresetTwTheme,
    borderRadiusThemeOptions,
  );
  if (isUndefined(borderRadius)) return;
  const corners = resolveCorner(corner as Corner);
  const borderRadiusStyles = corners.map((
    corder,
  ) => ["border", corder, "radius"]).filter(Boolean).map((styles) =>
    styles.join("-")
  );

  return borderRadiusStyles.reduce(reduceValue(borderRadius), {});
};

export const borderRadiuses: Rule[] = [
  [/^rounded$/, (_, { theme }) => {
    const borderRadius = resolveTheme(
      theme as PresetTwTheme,
      borderRadiusThemeOptions,
    );
    if (isStringOrNumber(borderRadius)) {
      return {
        "border-radius": borderRadius,
      };
    }
  }],
  [/^rounded-(t|r|b|l|tl|tr|br|bl)$/, handleBorderRadiusCorner],
  [/^rounded-(.+)/, ([, path], { theme }) => {
    const borderRadius = resolveTheme(theme as PresetTwTheme, {
      scope: "borderRadius",
      path,
    });
    if (isUndefined(borderRadius)) return;

    return {
      "border-radius": borderRadius,
    };
  }],
  [/^rounded-(t|r|b|l|tl|tr|br|bl)-(.+)$/, ([, corner, path], { theme }) => {
    const borderRadius = resolveTheme(theme as PresetTwTheme, {
      scope: "borderRadius",
      path,
    });
    if (isUndefined(borderRadius)) return;
    const corners = resolveCorner(corner as Corner);

    const borderRadiusStyles = corners.map((
      corder,
    ) => ["border", corder, "radius"]).filter(Boolean).map((styles) =>
      styles.join("-")
    );

    return borderRadiusStyles.reduce(reduceValue(borderRadius), {});
  }],
];

export const borderStyles: Rule[] = [
  [/^border-(solid|dashed|dotted|double|hidden|none)$/, ([, style]) => {
    return {
      "border-style": style,
    };
  }],
];

export const outlineWidths: Rule[] = [
  [/^outline-([\d.]+)$/, ([, width]) => {
    const outlineWidth = parseNumeric(width);
    if (isUndefined(outlineWidth)) return;
    return {
      "outline-width": `${outlineWidth}px`,
    };
  }],
];

export const outlineOffsets: Rule[] = [
  [/^outline-offset-([\d.]+)$/, ([, offset]) => {
    const outlineOffset = parseNumeric(offset);
    if (isUndefined(outlineOffset)) return;
    return {
      "outline-offset": px(outlineOffset),
    };
  }],
];

export const outlineStyles: Rule[] = [
  ["outline", { "outline-style": "solid" }],
  ["outline-none", {
    outline: "2px solid transparent",
    "outline-offset": "2px",
  }],
  [/^outline-(dashed|dotted|double|hidden)$/, ([, style]) => {
    return {
      "outline-style": style,
    };
  }],
];

export const outlineColors: Rule[] = [
  [/^outline-(.+)$/, ([, prop], { theme }) => {
    const colors = prop.split("-");
    const color = resolveTheme(theme as PresetTwTheme, {
      scope: "color",
      path: colors,
    }) as unknown;

    if (isStringOrNumber(color)) {
      return {
        "outline-color": color,
      };
    }
  }],
];

export { handleBorderWidthDirection, handleBorderWidthNumber };
