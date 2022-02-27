import { generate } from "../../core/generate.ts";

export const box: [string, ReturnType<typeof generate>["js"]][] = [
  ["box-decoration-clone", {
    ".box-decoration-clone": { boxDecorationBreak: "clone" },
  }],
  ["box-decoration-slice", {
    ".box-decoration-slice": { boxDecorationBreak: "slice" },
  }],
  ["box-border", {
    ".box-border": { boxSizing: "border-box" },
  }],
  ["box-content", {
    ".box-content": { boxSizing: "content-box" },
  }],
];
