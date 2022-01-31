import type { Rule } from "../../core/types.ts";

const TEXT_OVERFLOW = "text-overflow";

export const textOverflows: Rule[] = [
  ["text-ellipsis", { [TEXT_OVERFLOW]: "ellipsis" }],
  ["text-clip", { [TEXT_OVERFLOW]: "clip" }],
];
