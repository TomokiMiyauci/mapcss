import type { Identifier } from "../../core/types.ts";

export const overscroll: Identifier = {
  auto: {
    "overscroll-behavior": "auto",
  },
  contain: {
    "overscroll-behavior": "contain",
  },
  none: {
    "overscroll-behavior": "none",
  },
  x: {
    auto: {
      "overscroll-behavior-x": "auto",
    },
    contain: {
      "overscroll-behavior-x": "contain",
    },
    none: {
      "overscroll-behavior-x": "none",
    },
  },
  y: {
    auto: {
      "overscroll-behavior-y": "auto",
    },
    contain: {
      "overscroll-behavior-y": "contain",
    },
    none: {
      "overscroll-behavior-y": "none",
    },
  },
};
