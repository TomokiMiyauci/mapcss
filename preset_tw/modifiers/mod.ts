import { breakpoints } from "./breakpoint.ts";
import { colorSchemes } from "./color_scheme.ts";
import { hovers } from "./hover.ts";
import { focuses } from "./focus.ts";

export const nestedModifiers = [
  breakpoints,
  colorSchemes,
  hovers,
  focuses,
];

export { breakpoints, colorSchemes, focuses, hovers };
