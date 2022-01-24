import { AUTO } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const ASPECT_RATIO = "aspect-ratio";

export const aspectRatios: Rule[] = [
  ["aspect-auto", { [ASPECT_RATIO]: AUTO }],
  ["aspect-square", { [ASPECT_RATIO]: "1 / 1" }],
  ["aspect-video", { [ASPECT_RATIO]: "16 / 9" }],
];
