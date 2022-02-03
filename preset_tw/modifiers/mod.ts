import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { dark } from "./color_scheme.ts";
import { pseudo, scrollbar, scrollbarTrack } from "./pseudo.ts";
import { $important } from "./important.ts";
import { $minus } from "./minus.ts";

export const modifierMap = {
  sm,
  md,
  lg,
  xl,
  "2xl": $2xl,
  dark,
  hover: pseudo,
  focus: pseudo,
  "!": $important,
  "-": $minus,
  scrollbar,
  "scrollbar-track": scrollbarTrack,
};
