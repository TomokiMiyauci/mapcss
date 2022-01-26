import type { Modifier } from "./../../core/types.ts";

export const focuses: Modifier[] = [
  ["focus", (match) => {
    return {
      selector: (selector) => `.${match}\\:${selector}:${match}`,
    };
  }],
];
