// This module is browser compatible.

import type { CSSMap } from "../../core/types.ts";

export const box: CSSMap = {
  decoration: {
    clone: { boxDecorationBreak: "clone" },
    slice: { boxDecorationBreak: "slice" },
  },
  border: { boxSizing: "border-box" },
  content: { boxSizing: "content-box" },
};
