import { AUTO } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const Z_INDEX = "z-index";

export const zIndexes: Rule[] = [
  [/^z-(.+)$/, ([, v]) => ({ [Z_INDEX]: v })],
  ["z-auto", { [Z_INDEX]: AUTO }],
];
