import type { Specifier } from "../../core/types.ts";

export const box: Specifier = {
  decoration: {
    clone: { "box-decoration-break": "clone" },
    slice: { "box-decoration-break": "slice" },
  },
  border: { "box-sizing": "border-box" },
  content: { "box-sizing": "content-box" },
};
