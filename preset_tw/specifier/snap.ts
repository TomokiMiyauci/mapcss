import type { RecordSpecifier } from "../../core/types.ts";

export const snap: RecordSpecifier = {
  start: { "scroll-snap-align": "start" },
  end: { "scroll-snap-align": "end" },
  center: { "scroll-snap-align": "center" },
  align: {
    none: { "scroll-snap-align": "none" },
  },
};
