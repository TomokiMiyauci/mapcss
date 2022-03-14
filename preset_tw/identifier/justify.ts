import type { CSSMap } from "../../core/types.ts";

export const justify: CSSMap = {
  start: { justifyContent: "flex-start" },
  end: { justifyContent: "flex-end" },
  center: { justifyContent: "center" },
  between: { justifyContent: "space-between" },
  around: { justifyContent: "space-around" },
  evenly: { justifyContent: "space-evenly" },
  self: {
    auto: { justifySelf: "auto" },
    start: { justifySelf: "start" },
    end: { justifySelf: "end" },
    center: { justifySelf: "center" },
    stretch: { justifySelf: "stretch" },
  },
};
