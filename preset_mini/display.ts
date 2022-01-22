import { SAME_AS_KEY } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const display: Rule[] = [
  ["block", SAME_AS_KEY],
  ["inline-block", SAME_AS_KEY],
  ["inline", SAME_AS_KEY],
  ["flex", SAME_AS_KEY],
  ["inline-flex", SAME_AS_KEY],
  ["table", SAME_AS_KEY],
  ["inline-table", SAME_AS_KEY],
  ["table-caption", SAME_AS_KEY],
  ["contents", SAME_AS_KEY],
  ["grid", SAME_AS_KEY],
  ["flow-root", SAME_AS_KEY],
  ["list-item", SAME_AS_KEY],
  ["hidden", "none"],
];
