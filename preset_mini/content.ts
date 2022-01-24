import type { Rule } from "../core/types.ts";

const cssObject = { content: '""' };

export const contents: Rule[] = [
  ["content-empty", cssObject],
  ["content-none", cssObject],
];
