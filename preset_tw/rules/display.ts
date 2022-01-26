import { NONE } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const DISPLAY = "display";

export const displays: Rule[] = [
  ["block", { [DISPLAY]: "block" }],
  ["inline-block", { [DISPLAY]: "inline-block" }],
  ["inline", { [DISPLAY]: "inline" }],
  ["flex", { [DISPLAY]: "flex" }],
  ["inline-flex", { [DISPLAY]: "inline-flex" }],
  ["table", { [DISPLAY]: "table" }],
  ["inline-table", { [DISPLAY]: "inline-table" }],
  ["table-caption", { [DISPLAY]: "table-caption" }],
  ["contents", { [DISPLAY]: "contents" }],
  ["grid", { [DISPLAY]: "grid" }],
  ["flow-root", { [DISPLAY]: "flow-root" }],
  ["list-item", { [DISPLAY]: "list-item" }],
  ["hidden", { [DISPLAY]: NONE }],
];
