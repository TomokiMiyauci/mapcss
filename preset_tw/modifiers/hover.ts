import type { Modifier } from "./../../core/types.ts";

export const hovers: Modifier[] = [
  ["hover", (match) => {
    return {
      selector: (selector) => `.${match}\\:${selector}:${match}`,
    };
  }],
];
