import type { Specifier } from "../../core/types.ts";

export const not: Specifier = {
  italic: {
    "font-style": "normal",
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
      "white-space": "normal",
    },
  },
};
