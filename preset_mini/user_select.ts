import { AUTO, NONE } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const USER_SELECT = "user-select";
export const userSelects: Rule[] = [
  ["select-auto", { [USER_SELECT]: AUTO }],
  ["select-all", { [USER_SELECT]: "all" }],
  [
    "select-text",
    { [USER_SELECT]: "text" },
  ],
  ["select-none", { [USER_SELECT]: NONE }],
];
