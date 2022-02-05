import { AUTO } from "../../constants.ts";
import type { Specifier } from "../../core/types.ts";

const ASPECT_RATIO = "aspect-ratio";

export const aspect: Specifier = [
  ["auto", { [ASPECT_RATIO]: AUTO }],
  ["square", { [ASPECT_RATIO]: "1 / 1" }],
  ["video", { [ASPECT_RATIO]: "16 / 9" }],
];
