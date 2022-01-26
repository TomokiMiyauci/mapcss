import { isUndefined, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const columns: Rule[] = [
  [/^columns-(.+)$/, ([, body], { theme }) => {
    const column = prop(body, theme.column);
    if (isUndefined(column)) return;
    return {
      columns: column,
    };
  }],
];
