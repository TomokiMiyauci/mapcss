import { AUTO, CENTER, END, START, STRETCH } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const JUSTIFY_SELF = "justify-self";

export const justifySelfs: Rule[] = [
  ["justify-self-auto", { [JUSTIFY_SELF]: AUTO }],
  ["justify-self-start", { [JUSTIFY_SELF]: START }],
  ["justify-self-end", { [JUSTIFY_SELF]: END }],
  ["justify-self-center", { [JUSTIFY_SELF]: CENTER }],
  ["justify-self-stretch", { [JUSTIFY_SELF]: STRETCH }],
];
