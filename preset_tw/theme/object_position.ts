import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from "../../constants.ts";
import type { Theme } from "../../core/types.ts";

export const objectPosition: Theme["objectPosition"] = {
  [TOP]: TOP,
  [BOTTOM]: BOTTOM,
  [CENTER]: CENTER,
  [LEFT]: LEFT,
  [RIGHT]: RIGHT,
  [`${LEFT}-${BOTTOM}`]: `${LEFT} ${BOTTOM}`,
  [`${LEFT}-${TOP}`]: `${LEFT} ${TOP}`,
  [`${RIGHT}-${BOTTOM}`]: `${RIGHT} ${BOTTOM}`,
  [`${RIGHT}-${TOP}`]: `${RIGHT} ${TOP}`,
};
