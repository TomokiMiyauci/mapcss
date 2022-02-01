import { HIDDEN } from "../../constants.ts";
import type { Mapper } from "../../core/types.ts";

const BACKFACE_VISIBILITY = "backface-visibility";

export const backface: Mapper = {
  visible: { [BACKFACE_VISIBILITY]: "visible" },
  hidden: { [BACKFACE_VISIBILITY]: HIDDEN },
};
