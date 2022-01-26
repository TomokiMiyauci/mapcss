import type { Modifier } from "./../../core/types.ts";

export const colorSchemes: Modifier[] = [
  ["dark", (match) => {
    return {
      selector: (selector) => `.${match} .${match}\\:${selector}`,
    };
  }],
];
