import { SAME_AS_KEY } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const textDecorationLine: Rule[] = [
  ["underline", SAME_AS_KEY],
  ["overline", SAME_AS_KEY],
  ["line-through", SAME_AS_KEY],
  ["decoration-underline", "underline"],
  ["decoration-line-through", "line-through"],
];
