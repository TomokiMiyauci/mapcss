import { AUTO, CENTER, END, START } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const justifySelf: Rule[] = [
  ["justify-self-auto", AUTO],
  ["justify-self-start", START],
  ["justify-self-end", END],
  ["justify-self-center", CENTER],
  ["justify-self-stretch", "stretch"],
];
