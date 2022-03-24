import { isString } from "../deps.ts";
import type { Modifier } from "../../core/types.ts";

/** <integer>, <number> */
export const reNumber = /^([+-]?[\d\.e-]+)$/; // TODO(miyauci): more strict check

/** <dimension>, <percentage>, <flex>, <length>, <time>, <frequency> */
export const reUnitNumber =
  /^([+-]?[\d\.e]+)(px|rem|pt|ms|s|hz|%|fr|cap|ch|em|ex|ic|lh|rem|rlh|vh|vw|vi|vb|vmin|vmax|cm|mm|Q|in|pc|s|ms|kHz)$/i;

export const $minus: Modifier = (parentNode) => {
  let hit = false;
  parentNode.walkDecls((decl) => {
    const value = decl.value;
    const result = reNumber.exec(value);
    if (result) {
      const num = Number(result[1]);
      if (Number.isFinite(num)) {
        hit = true;
        decl.value = String(-num);
      }
    } else if (reUnitNumber.test(value)) {
      const result = reUnitNumber.exec(value);
      if (result) {
        const num = Number(result[1]);
        const unit = result[2];
        if ((Number.isFinite(num)) && isString(unit)) {
          hit = true;
          decl.value = String(`${-num}${unit}`);
        }
      }
    }
  });
  if (hit) {
    return parentNode;
  }
};
