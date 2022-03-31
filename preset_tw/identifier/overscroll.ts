// This module is browser compatible.

import type { CSSMap } from "../../core/types.ts";

export const overscroll: CSSMap = {
  auto: { overscrollBehavior: "auto" },
  contain: { overscrollBehavior: "contain" },
  none: { overscrollBehavior: "none" },
  x: {
    auto: { overscrollBehaviorX: "auto" },
    contain: { overscrollBehaviorX: "contain" },
    none: { overscrollBehaviorX: "none" },
  },
  y: {
    auto: { overscrollBehaviorY: "auto" },
    contain: { overscrollBehaviorY: "contain" },
    none: { overscrollBehaviorY: "none" },
  },
};
