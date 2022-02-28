import type { RecordIdentifier } from "../../core/types.ts";

export const box: RecordIdentifier = {
  decoration: {
    clone: { "box-decoration-break": "clone" },
    slice: { "box-decoration-break": "slice" },
  },
  border: { "box-sizing": "border-box" },
  content: { "box-sizing": "content-box" },
};
