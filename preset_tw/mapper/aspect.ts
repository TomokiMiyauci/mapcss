import { AUTO } from "../../constants.ts";
import type { Mapper } from "../../core/types.ts";

const ASPECT_RATIO = "aspect-ratio";

export const aspect: Mapper = [
  ["auto", { [ASPECT_RATIO]: AUTO }],
  ["square", { [ASPECT_RATIO]: "1 / 1" }],
  ["video", { [ASPECT_RATIO]: "16 / 9" }],
];
