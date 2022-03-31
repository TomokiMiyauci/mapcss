// This module is browser compatible.

import type { CSSMap } from "../../core/types.ts";

const transitionBase = {
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
};

export const transition: CSSMap = {
  "": {
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    ...transitionBase,
  },
  none: { transitionProperty: "none" },
  all: {
    transitionProperty: "all",
    ...transitionBase,
  },
  colors: {
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    ...transitionBase,
  },
  opacity: {
    transitionProperty: "opacity",
    ...transitionBase,
  },
  shadow: {
    transitionProperty: "box-shadow",
    ...transitionBase,
  },
  transform: {
    transitionProperty: "transform",
    ...transitionBase,
  },
};
