import type { RecordSpecifier } from "../../core/types.ts";

export const box: RecordSpecifier = {
  decoration: {
    clone: { "box-decoration-break": "clone" },
    slice: { "box-decoration-break": "slice" },
  },
  border: { "box-sizing": "border-box" },
  content: { "box-sizing": "content-box" },
};
