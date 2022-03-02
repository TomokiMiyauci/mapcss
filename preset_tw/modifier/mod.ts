import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { createDark } from "./color_scheme.ts";
import {
  pseudoHandler,
  scrollbar,
  scrollbarThumb,
  scrollbarTrack,
} from "./pseudo.ts";
import { $important } from "./important.ts";
import { $minus } from "./minus.ts";
import { group } from "./group.ts";
import type { Option } from "../types.ts";
import type { ModifierMap } from "./../../core/types.ts";

export function createModifierMap(darkMode: Option["darkMode"]): ModifierMap {
  const modifierMap: ModifierMap = {
    sm,
    md,
    lg,
    xl,
    dark: createDark(darkMode),
    "2xl": $2xl,
    hover: pseudoHandler,
    focus: pseudoHandler,
    "!": $important,
    "-": $minus,
    scrollbar,
    "scrollbar-track": scrollbarTrack,
    "scrollbar-thumb": scrollbarThumb,
    group,
  };
  return modifierMap;
}
