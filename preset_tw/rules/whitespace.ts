import type { Mapper } from "../../core/types.ts";

const WHITE_SPACE = "white-space";

export const whitespace: Mapper = [
  ["normal", { [WHITE_SPACE]: "normal" }],
  ["nowrap", { [WHITE_SPACE]: "nowrap" }],
  ["pre", {
    DEFAULT: { [WHITE_SPACE]: "pre" },
    line: { [WHITE_SPACE]: "pre-line" },
    wrap: { [WHITE_SPACE]: "pre-wrap" },
  }],
];
