import { isString, propPath } from "../../deps.ts";
import { SEPARATOR } from "../_utils.ts";
import type { Rule } from "../../core/types.ts";

export const colors: Rule[] = [
  [/^text-(.+)$/, ([, body], { theme }) => {
    const colors = body.split(SEPARATOR);

    const color = propPath(colors, theme.color);
    if (isString(color)) {
      return {
        color,
      };
    }
  }],
];
