import { isString, isStringOrNumber, isUndefined } from "../../deps.ts";
import {
  resolveCorner,
  resolveDirection,
  resolveTheme,
} from "../../core/utils/resolver.ts";
import { reduceValue } from "../../core/_utils.ts";
import { parseNumeric } from "../../core/utils/parse.ts";
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

const handleBorderColor: RuleHandler = ([, dir, path], { theme }) => {
  const _dir = dir as Dir | undefined;
  const c = path.split("-");
  const color = resolveTheme(theme as PresetTwTheme, {
    scope: "color",
    path: c,
  }) as unknown;

  if (!isStringOrNumber(color)) return;

  const directions = isUndefined(_dir) ? [""] : resolveDirection(_dir) ?? [];
  const borderColors = directions.map((dir) =>
    ["border", dir, "color"].filter(Boolean).join("-")
  );

  return borderColors.reduce(reduceValue(color), {});
};

export const borderColors: Rule[] = [
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

export { handleBorderWidthDirection, handleBorderWidthNumber };
