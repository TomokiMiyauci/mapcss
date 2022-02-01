import type { Mapper } from "../../core/types.ts";

const LETTER_SPACING = "letter-spacing";

export const tracking: Mapper = [
  ["tighter", { [LETTER_SPACING]: "-0.05em" }],
  ["tight", { [LETTER_SPACING]: "-0.025em" }],
  ["normal", { [LETTER_SPACING]: "0em" }],
  ["wide", { [LETTER_SPACING]: "0.025em" }],
  ["wider", { [LETTER_SPACING]: "0.05em" }],
  ["widest", { [LETTER_SPACING]: "0.1em" }],
];
