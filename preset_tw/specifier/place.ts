import type { EntriesSpecifier } from "../../core/types.ts";

export const place: EntriesSpecifier = [
  ["content", {
    center: { ["place-content"]: "center" },
    start: { ["place-content"]: "start" },
    end: { ["place-content"]: "end" },
    between: { ["place-content"]: "space-between" },
    around: { ["place-content"]: "space-around" },
    evenly: { ["place-content"]: "space-evenly" },
    stretch: { ["place-content"]: "stretch" },
  }],
  ["items", {
    start: { ["place-items"]: "start" },
    end: { ["place-items"]: "end" },
    center: { ["place-items"]: "center" },
    stretch: { ["place-items"]: "stretch" },
  }],
];
