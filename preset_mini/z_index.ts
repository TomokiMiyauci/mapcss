import { AUTO } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const zIndex: Rule[] = [
  [/^z-(.+)$/, ([, v]) => v],
  ["z-auto", AUTO],
];
