import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { dark } from "./color_scheme.ts";
import { pseudo, scrollbar, scrollbarThumb, scrollbarTrack } from "./pseudo.ts";
import { $important } from "./important.ts";
import { $minus } from "./minus.ts";
import type { ModifierMap } from "./../../core/types.ts";
export const modifierMap: ModifierMap = {
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
  "scrollbar-thumb": scrollbarThumb,
};
