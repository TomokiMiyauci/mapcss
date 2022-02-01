import type { Mapper } from "../../core/types.ts";
export const content: Mapper = {
  none: { content: "none" },
  center: { "align-content": "center" },
  start: { "align-content": "flex-start" },
  end: { "align-content": "flex-end" },
  between: { "align-content": "space-between" },
  around: { "align-content": "space-around" },
  evenly: { "align-content": "space-evenly" },
};
