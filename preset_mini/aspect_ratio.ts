import { AUTO } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const aspectRatio: Rule[] = [
  ["aspect-auto", AUTO],
  ["aspect-square", "1 / 1"],
  ["aspect-video", "16 / 9"],
];
