import type { Mapper } from "../../core/types.ts";

const VERTICAL_ALIGN = "vertical-align";

export const align: Mapper = [
  ["baseline", { [VERTICAL_ALIGN]: "baseline" }],
  ["top", { [VERTICAL_ALIGN]: "top" }],
  ["middle", { [VERTICAL_ALIGN]: "middle" }],
  ["bottom", { [VERTICAL_ALIGN]: "bottom" }],
  ["text", {
    top: { [VERTICAL_ALIGN]: "text-top" },
    bottom: { [VERTICAL_ALIGN]: "text-bottom" },
  }],
  ["sub", { [VERTICAL_ALIGN]: "sub" }],
  ["super", { [VERTICAL_ALIGN]: "super" }],
];
