import type { CSSMap } from "../../core/types.ts";

export const place: CSSMap = {
  content: {
    center: { placeContent: "center" },
    start: { placeContent: "start" },
    end: { placeContent: "end" },
    between: { placeContent: "space-between" },
    around: { placeContent: "space-around" },
    evenly: { placeContent: "space-evenly" },
    stretch: { placeContent: "stretch" },
  },
  items: {
    start: { placeItems: "start" },
    end: { placeItems: "end" },
    center: { placeItems: "center" },
    stretch: { placeItems: "stretch" },
  },
  self: {
    auto: { placeSelf: "auto" },
    start: { placeSelf: "start" },
    end: { placeSelf: "end" },
    center: { placeSelf: "center" },
    stretch: { placeSelf: "stretch" },
  },
};
