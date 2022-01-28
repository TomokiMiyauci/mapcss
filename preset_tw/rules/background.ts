import { colorResolver } from "../theme/_utils.ts";
import { SEPARATOR } from "../_utils.ts";
import { isString } from "../../deps.ts";

import type { Rule } from "../../core/types.ts";

export const backgroundColors: Rule[] = [
  [/^bg-(.+)$/, ([, body], { theme }) => {
    const colors = body.split(SEPARATOR);
    const color = colorResolver(theme, colors);

    if (isString(color)) {
      return {
        "background-color": color,
      };
    }
  }],
];
