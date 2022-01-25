import { isString, propPath } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const colors: Rule[] = [
  [/^text-(.+)$/, ([, body], theme) => {
    const separator = "-";
    const colors = body.split(separator);

    const color = propPath(colors, theme.color);
    if (isString(color)) {
      return {
        color,
      };
    }
  }],
];
