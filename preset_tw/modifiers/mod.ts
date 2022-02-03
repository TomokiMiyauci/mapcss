import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { dark } from "./color_scheme.ts";
import { pseudo } from "./pseudo.ts";

export const modifierMap = {
  sm,
  md,
  lg,
  xl,
  "2xl": $2xl,
  dark,
  hover: pseudo,
  focus: pseudo,
};

export { sm };
