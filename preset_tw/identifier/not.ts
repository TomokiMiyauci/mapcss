// This module is browser compatible.

import type { CSSMap } from "../../core/types.ts";

export const not: CSSMap = {
  italic: {
    fontStyle: "normal",
  },
  sr: {
    only: {
      position: "static",
      width: "auto",
      height: "auto",
      padding: 0,
      margin: 0,
      overflow: "visible",
      clip: "auto",
      whiteSpace: "normal",
    },
  },
};
