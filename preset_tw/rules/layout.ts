import {
  AUTO,
  AVOID,
  BOTH,
  HIDDEN,
  LEFT,
  NONE,
  RIGHT,
  X,
  Y,
} from "../../constants.ts";
import { isString, isUndefined, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

const ASPECT_RATIO = "aspect-ratio";

export const aspectRatios: Rule[] = [
  ["aspect-auto", { [ASPECT_RATIO]: AUTO }],
  ["aspect-square", { [ASPECT_RATIO]: "1 / 1" }],
  ["aspect-video", { [ASPECT_RATIO]: "16 / 9" }],
];

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

const BREAK_AFTER = "break-after";

export const breakAfter: Rule[] = [
  ["break-after-auto", { [BREAK_AFTER]: AUTO }],
  ["break-after-avoid", { [BREAK_AFTER]: "avoid" }],
  ["break-after-all", { [BREAK_AFTER]: "all" }],
  ["break-after-avoid-page", { [BREAK_AFTER]: "avoid-page" }],
  ["break-after-page", { [BREAK_AFTER]: "page" }],
  ["break-after-left", { [BREAK_AFTER]: LEFT }],
  ["break-after-right", { [BREAK_AFTER]: RIGHT }],
  ["break-after-column", { [BREAK_AFTER]: "column" }],
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

export const columns: Rule[] = [
  [/^columns-(.+)$/, ([, body], { theme }) => {
    const column = prop(body, theme.column);
    if (isUndefined(column)) return;
    return {
      columns: column,
    };
  }],
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

const CLEAR = "clear";

export const clears: Rule[] = [
  ["clear-left", { [CLEAR]: LEFT }],
  ["clear-right", { [CLEAR]: RIGHT }],
  ["clear-both", { [CLEAR]: BOTH }],
  ["clear-none", { [CLEAR]: NONE }],
];

const ISOLATION = "isolation";

export const isolations: Rule[] = [
  ["isolate", { [ISOLATION]: "isolate" }],
  ["isolation-auto", { [ISOLATION]: AUTO }],
];

const OBJECT_FIT = "object-fit";

export const objectFits: Rule[] = [
  ["object-contain", { [OBJECT_FIT]: "contain" }],
  ["object-cover", { [OBJECT_FIT]: "cover" }],
  ["object-fill", { [OBJECT_FIT]: "fill" }],
  ["object-none", { [OBJECT_FIT]: NONE }],
  ["object-scale-down", { [OBJECT_FIT]: "scale-down" }],
];

export const objectPositions: Rule[] = [
  [/^object-(.+)$/, ([, body], { theme }) => {
    const objectPosition = prop(body, theme.objectPosition);
    if (isString(objectPosition)) {
      return {
        "object-position": objectPosition,
      };
    }
  }],
];

const OVERFLOW = "overflow";

export const overflows: Rule[] = [
  ["overflow-auto", { [OVERFLOW]: AUTO }],
  ["overflow-hidden", { [OVERFLOW]: HIDDEN }],
  ["overflow-clip", { [OVERFLOW]: "clip" }],
  ["overflow-visible", { [OVERFLOW]: "visible" }],
  ["overflow-scroll", { [OVERFLOW]: "scroll" }],
  ["overflow-x-auto", { [`${OVERFLOW}-${X}`]: AUTO }],
  ["overflow-y-auto", { [`${OVERFLOW}-${Y}`]: AUTO }],
  ["overflow-x-hidden", { [`${OVERFLOW}-${X}`]: HIDDEN }],
  ["overflow-y-hidden", { [`${OVERFLOW}-${Y}`]: HIDDEN }],
  ["overflow-x-clip", { [`${OVERFLOW}-${X}`]: "clip" }],
  ["overflow-y-clip", { [`${OVERFLOW}-${Y}`]: "clip" }],
  ["overflow-x-visible", { [`${OVERFLOW}-${X}`]: "visible" }],
  ["overflow-y-visible", { [`${OVERFLOW}-${Y}`]: "visible" }],
  ["overflow-x-scroll", { [`${OVERFLOW}-${X}`]: "scroll" }],
  ["overflow-y-scroll", { [`${OVERFLOW}-${Y}`]: "scroll" }],
];

const OVERSCROLL_BEHAVIOR = "overscroll-behavior";

export const overscrollBehaviors: Rule[] = [
  ["overscroll-auto", { [OVERSCROLL_BEHAVIOR]: AUTO }],
  ["overscroll-contain", { [OVERSCROLL_BEHAVIOR]: "contain" }],
  ["overscroll-none", { [OVERSCROLL_BEHAVIOR]: NONE }],
  ["overscroll-y-auto", { [`${OVERSCROLL_BEHAVIOR}-${Y}`]: AUTO }],
  ["overscroll-y-contain", { [`${OVERSCROLL_BEHAVIOR}-${Y}`]: "contain" }],
  ["overscroll-y-none", { [`${OVERSCROLL_BEHAVIOR}-${Y}`]: NONE }],
  ["overscroll-x-auto", { [`${OVERSCROLL_BEHAVIOR}-${X}`]: AUTO }],
  ["overscroll-x-contain", { [`${OVERSCROLL_BEHAVIOR}-${X}`]: "contain" }],
  ["overscroll-x-none", { [`${OVERSCROLL_BEHAVIOR}-${X}`]: NONE }],
];
