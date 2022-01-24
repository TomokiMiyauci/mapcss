import { CENTER, END, START, STRETCH } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const JUSTIFY_ITEMS = "justify-items";

export const justifyItems: Rule[] = [
  ["justify-items-start", { [JUSTIFY_ITEMS]: START }],
  ["justify-items-end", { [JUSTIFY_ITEMS]: END }],
  ["justify-items-center", { [JUSTIFY_ITEMS]: CENTER }],
  ["justify-items-stretch", { [JUSTIFY_ITEMS]: STRETCH }],
];
