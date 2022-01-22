import { SAME_AS_KEY } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const position: Rule[] = [
  ["relative", SAME_AS_KEY],
  ["absolute", SAME_AS_KEY],
  ["fixed", SAME_AS_KEY],
  ["sticky", SAME_AS_KEY],
  ["static", SAME_AS_KEY],
];
