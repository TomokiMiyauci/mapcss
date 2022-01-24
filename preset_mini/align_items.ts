import { CENTER, END, FLEX, START } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const ALIGN_ITEMS = "align-items";

export const alignItems: Rule[] = [
  ["items-start", { [ALIGN_ITEMS]: `${FLEX}-${START}` }],
  ["items-end", { [ALIGN_ITEMS]: `${FLEX}-${END}` }],
  ["items-center", { [ALIGN_ITEMS]: CENTER }],
  ["items-baseline", { [ALIGN_ITEMS]: "baseline" }],
  ["items-stretch", { [ALIGN_ITEMS]: "stretch" }],
];
