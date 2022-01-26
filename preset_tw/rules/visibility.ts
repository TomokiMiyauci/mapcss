import type { Rule } from "../../core/types.ts";

const VISIBILITY = "visibility";
export const visibilities: Rule[] = [
  ["visible", { [VISIBILITY]: "visible" }],
  ["invisible", { [VISIBILITY]: "hidden" }],
];
