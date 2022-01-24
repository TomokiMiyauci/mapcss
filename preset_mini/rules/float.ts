import { LEFT, NONE, RIGHT } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const FLOAT = "float";
export const floats: Rule[] = [
  ["float-right", { [FLOAT]: RIGHT }],
  ["float-left", { [FLOAT]: LEFT }],
  ["float-none", { [FLOAT]: NONE }],
];
