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
import { isNumber, isString, isUndefined, prop } from "../../deps.ts";
import { longDirection4Map } from "../../core/utils/mapping.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { parseFraction, parseNumeric } from "../../core/utils/parse.ts";
import { reduceValue } from "../../core/_utils.ts";
import { rem } from "../../core/utils/unit.ts";
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

const BREAK_BEFORE = "break-before";

export const breakBefore: Rule[] = [
  ["break-before-auto", { [BREAK_BEFORE]: AUTO }],
  ["break-before-avoid", { [BREAK_BEFORE]: "avoid" }],
  ["break-before-all", { [BREAK_BEFORE]: "all" }],
  ["break-before-avoid-page", { [BREAK_BEFORE]: "avoid-page" }],
  ["break-before-page", { [BREAK_BEFORE]: "page" }],
  ["break-before-left", { [BREAK_BEFORE]: LEFT }],
  ["break-before-right", { [BREAK_BEFORE]: RIGHT }],
  ["break-before-column", { [BREAK_BEFORE]: "column" }],
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
  [/^columns-(.+)$/, ([, path], { theme }) => {
    const column = resolveTheme(theme, { scope: "column", path });

    if (isString(column) || isNumber(column)) {
      return {
        columns: column,
      };
    }
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

const POSITION = "position";

export const positions: Rule[] = [
  ["relative", { [POSITION]: "relative" }],
  ["absolute", { [POSITION]: "absolute" }],
  ["fixed", { [POSITION]: "fixed" }],
  ["sticky", { [POSITION]: "sticky" }],
  ["static", { [POSITION]: "static" }],
];

const VISIBILITY = "visibility";
export const visibilities: Rule[] = [
  ["visible", { [VISIBILITY]: "visible" }],
  ["invisible", { [VISIBILITY]: "hidden" }],
];

function resolveInset(value: string): string[] | undefined {
  const { top, right, bottom, left } = longDirection4Map;
  const insetMap: Record<string, string[]> = {
    top: [top],
    right: [right],
    bottom: [bottom],
    left: [left],
    inset: [top, right, bottom, left],
    "inset-x": [left, right],
    "inset-y": [top, bottom],
  };
  return insetMap[value];
}

export const insets: Rule[] = [
  [
    /^(top|right|bottom|left|inset|inset-x|inset-y)-(\d+)\/(\d+)$/,
    ([, key, numerator, denominator]) => {
      const insets = resolveInset(key);
      if (!insets) return;
      const fraction = parseFraction(numerator, denominator);
      if (isUndefined(fraction)) return;
      return insets.reduce(reduceValue(`${fraction}%`), {});
    },
  ],
  [
    /^(top|right|bottom|left|inset|inset-x|inset-y)-(0|px)$/,
    ([, key, prop]) => {
      const m: Record<PropertyKey, string> = { 0: "0px", px: "1px" };
      const value = m[prop] as string | undefined;
      const insets = resolveInset(key);
      if (!insets || isUndefined(value)) return;
      return insets.reduce(reduceValue(value), {});
    },
  ],
  [
    /^(top|right|bottom|left|inset|inset-x|inset-y)-([\d.]+)$/,
    ([, key, num]) => {
      const insets = resolveInset(key);
      if (!insets) return;
      const number = parseNumeric(num);
      if (isUndefined(number)) return;
      return insets.reduce(reduceValue(rem(number / 4)), {});
    },
  ],
  [
    /^(top|right|bottom|left|inset|inset-x|inset-y)-\[(.+)\]$/,
    ([, key, attr]) => {
      const insets = resolveInset(key);
      if (!insets) return;
      return insets.reduce(reduceValue(attr), {});
    },
  ],
  [
    /^(top|right|bottom|left|inset|inset-x|inset-y)-(.+)$/,
    ([, key, prop]) => {
      const insets = resolveInset(key);
      if (!insets) return;
      const m: Record<PropertyKey, string> = {
        full: "100%",
        auto: "auto",
      };
      const value = m[prop] as string | undefined;
      if (isUndefined(value)) return;
      return insets.reduce(reduceValue(value), {});
    },
  ],
];

const Z_INDEX = "z-index";

export const zIndexes: Rule[] = [
  ["z-auto", { [Z_INDEX]: AUTO }],
  [/^z-(\d+)$/, ([, v]) => ({ [Z_INDEX]: v })],
];
