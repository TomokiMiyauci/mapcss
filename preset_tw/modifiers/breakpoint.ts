import { isString, prop } from "../../deps.ts";
import type { Modifier, ModifierHandler } from "./../../core/types.ts";

const breakpointHandler: ModifierHandler = (match, { theme }) => {
  const screen = prop(match, theme.screen);
  if (isString(screen)) {
    return {
      identifier: "media",
      rule: `(min-width: ${screen})`,
      selector: (selector) => `.${match}\\:${selector}`,
    };
  }
};

export const breakpoints: Modifier[] = [
  ["sm", breakpointHandler],
  ["md", breakpointHandler],
  ["lg", breakpointHandler],
  ["xl", breakpointHandler],
  ["2xl", breakpointHandler],
];
