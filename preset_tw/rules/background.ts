import { colorByProp, colorOpacityByProp } from "./_utils.ts";
import type { Rule } from "../../core/types.ts";

const BACKGROUND_COLOR = "background-color";

export const backgroundColors: Rule[] = [
  [/^bg-(.+)\/(\d+)$/, ([, prop, opacity], { theme }) => {
    return colorOpacityByProp(BACKGROUND_COLOR, { theme, prop, opacity });
  }],
  [/^bg-(.+)$/, ([, prop], { theme }) => {
    return colorByProp(BACKGROUND_COLOR, { theme, prop });
  }],
];
