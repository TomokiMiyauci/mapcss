import type { Specifier } from "../../core/types.ts";

export const justify: Specifier = {
  start: { "justify-content": "flex-start" },
  end: { "justify-content": "flex-end" },
  center: { "justify-content": "center" },
  between: { "justify-content": "space-between" },
  around: { "justify-content": "space-around" },
  evenly: { "justify-content": "space-evenly" },
  self: {
    auto: { "justify-self": "auto" },
    start: { "justify-self": "start" },
    end: { "justify-self": "end" },
    center: { "justify-self": "center" },
    stretch: { "justify-self": "stretch" },
  },
};
