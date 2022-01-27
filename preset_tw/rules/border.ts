import { BOTTOM, LEFT, RIGHT, TOP } from "../../constants.ts";
import { isString, isStringOrNumber, isUndefined, prop } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import type { Rule, RuleHandler } from "../../core/types.ts";
import type { PresetTwTheme } from "../theme/types.ts";

const BORDER_WIDTH = "border-width";

type Dir = "x" | "y" | "t" | "r" | "b" | "l";

function parseNumeric(value: string): number | undefined {
  const number = Number(value);
  if (Number.isNaN(number)) return;
  return number;
}

const directionMap = {
  x: [LEFT, RIGHT],
  y: [TOP, BOTTOM],
  t: [TOP],
  r: [RIGHT],
  b: [BOTTOM],
  l: [LEFT],
};

function resolveDirection(key: Dir): string[] {
  return directionMap[key];
}

const handleBorderWidthDirection: RuleHandler = (
  [, direction, num],
  { theme },
) => {
  const directions = prop(
    direction as Dir,
    directionMap,
  );

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

  return borderWidths.reduce((acc, cur) => {
    return { ...acc, [cur]: number };
  }, {});
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

  const directions = isUndefined(_dir) ? [""] : resolveDirection(_dir);
  const borderColors = directions.map((dir) =>
    ["border", dir, "color"].filter(Boolean).join("-")
  );

  return borderColors.reduce((acc, cur) => ({ ...acc, [cur]: color }), {});
};

export const borderColors: Rule[] = [
  [/^border(?:-([xytrbl]))?-(.+)$/, handleBorderColor],
];

export { handleBorderWidthDirection, handleBorderWidthNumber };
