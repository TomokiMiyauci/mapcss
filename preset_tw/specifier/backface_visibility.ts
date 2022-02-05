import { HIDDEN } from "../../constants.ts";
import type { Specifier } from "../../core/types.ts";

const BACKFACE_VISIBILITY = "backface-visibility";

export const backface: Specifier = {
  visible: { [BACKFACE_VISIBILITY]: "visible" },
  hidden: { [BACKFACE_VISIBILITY]: HIDDEN },
};
