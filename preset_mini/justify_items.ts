import { CENTER, END, START } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const justifyItems: Rule[] = [
  ["justify-items-start", START],
  ["justify-items-end", END],
  ["justify-items-center", CENTER],
  ["justify-items-stretch", "stretch"],
];
