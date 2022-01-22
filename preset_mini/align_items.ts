import { CENTER, END, FLEX, START } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const alignItems: Rule[] = [
  ["items-start", `${FLEX}-${START}`],
  ["items-end", `${FLEX}-${END}`],
  ["items-center", CENTER],
  ["items-baseline", "baseline"],
  ["items-stretch", "stretch"],
];
