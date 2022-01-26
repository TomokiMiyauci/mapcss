import { AUTO, AVOID, LEFT, NONE, RIGHT } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const BREAK_INSIDE = "break-inside";

export const breakInsides: Rule[] = [
  ["break-inside-auto", {
    [BREAK_INSIDE]: AUTO,
  }],
  ["break-inside-avoid", {
    [BREAK_INSIDE]: AVOID,
  }],
  ["break-inside-avoid-page", {
    [BREAK_INSIDE]: `${AVOID}-page`,
  }],
  ["break-inside-avoid-column", {
    [BREAK_INSIDE]: `${AVOID}-column`,
  }],
];

const BOX_DECORATION_BREAK = "box-decoration-break";
export const boxDecorations: Rule[] = [
  ["box-decoration-clone", {
    [BOX_DECORATION_BREAK]: "clone",
  }],
  ["box-decoration-slice", {
    [BOX_DECORATION_BREAK]: "slice",
  }],
];

const BOX_SIZING = "box-sizing";

export const boxSizings: Rule[] = [
  ["box-border", { [BOX_SIZING]: "border-box" }],
  ["box-content", { [BOX_SIZING]: "content-box" }],
];

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

const FLOAT = "float";
export const floats: Rule[] = [
  ["float-right", { [FLOAT]: RIGHT }],
  ["float-left", { [FLOAT]: LEFT }],
  ["float-none", { [FLOAT]: NONE }],
];
