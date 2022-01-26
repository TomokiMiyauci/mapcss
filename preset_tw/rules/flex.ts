import { AUTO, NONE } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const FLEX = "flex";

export const flexes: Rule[] = [
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { [FLEX]: `1 1 ${AUTO}` }],
  ["flex-initial", { [FLEX]: `0 1 ${AUTO}` }],
  ["flex-none", { [FLEX]: NONE }],
];
