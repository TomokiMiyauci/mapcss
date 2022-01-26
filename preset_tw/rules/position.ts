import type { Rule } from "../../core/types.ts";

const POSITION = "position";

export const positions: Rule[] = [
  ["relative", { [POSITION]: "relative" }],
  ["absolute", { [POSITION]: "absolute" }],
  ["fixed", { [POSITION]: "fixed" }],
  ["sticky", { [POSITION]: "sticky" }],
  ["static", { [POSITION]: "static" }],
];
