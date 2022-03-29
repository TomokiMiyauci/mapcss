// This module is browser compatible.

import { selectorTransform } from "./_utils.ts";
import type { ModifierDefinition, ModifierMap } from "../../core/types.ts";

function createGroup(value: string): ModifierDefinition {
  return selectorTransform((selector) => `.group${value} ${selector}`);
}

export const group: ModifierMap = {
  hover: createGroup(":hover"),
  focus: {
    "": createGroup(":focus"),
    within: createGroup(":focus-within"),
    visible: createGroup(":focus-visible"),
  },
  active: createGroup(":active"),
  visited: createGroup(":visited"),
  target: createGroup(":target"),
  first: {
    "": createGroup(":first-child"),
    of: {
      type: createGroup(":first-of-type"),
    },
  },
  last: {
    "": createGroup(":last-child"),
    of: {
      type: createGroup(":last-of-type"),
    },
  },
  only: {
    DEFAULT: createGroup(":only-child"),
    of: {
      type: createGroup(":only-of-type"),
    },
  },
  empty: createGroup(":empty"),
  disabled: createGroup(":disabled"),
  checked: createGroup(":checked"),
  indeterminate: createGroup(":indeterminate"),
  default: createGroup(":default"),
  required: createGroup(":required"),
  valid: createGroup(":valid"),
  invalid: createGroup(":invalid"),
  in: {
    range: createGroup(":in-range"),
  },
  out: {
    of: {
      range: createGroup(":out-of-range"),
    },
  },
  placeholder: {
    shown: createGroup(":placeholder-shown"),
  },
  autofill: createGroup(":autofill"),
  read: {
    only: createGroup(":read-only"),
  },
  open: createGroup("[open]"),
  odd: createGroup(":nth-child(odd)"),
  even: createGroup(":nth-child(even)"),
};
