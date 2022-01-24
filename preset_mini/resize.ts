import { BOTH, NONE } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const RESIZE = "resize";
export const resizes: Rule[] = [
  [
    "resize-x",
    { [RESIZE]: "horizontal" },
  ],
  [
    "resize-z",
    { [RESIZE]: "vertical" },
  ],
  [
    "resize",
    { [RESIZE]: BOTH },
  ],
  [
    "resize-none",
    { [RESIZE]: NONE },
  ],
];
