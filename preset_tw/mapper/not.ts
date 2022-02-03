import type { Mapper } from "../../core/types.ts";

export const not: Mapper = {
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
