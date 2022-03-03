import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { createDark } from "./color_scheme.ts";
import {
  pseudoHandler,
  scrollbar,
  scrollbarThumb,
  scrollbarTrack,
} from "./pseudo.ts";
import { createMedia } from "./at_rule.ts";
import { content } from "./pseudo_elements.ts";
import { $important } from "./important.ts";
import { $minus } from "./minus.ts";
import { group } from "./group.ts";
import { selectorTransform } from "./_utils.ts";
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
    hover: pseudoHandler(":hover"),
    focus: {
      DEFAULT: pseudoHandler(":focus"),
      within: pseudoHandler(":focus-within"),
      visible: pseudoHandler(":focus-visible"),
    },
    open: pseudoHandler("[open]"),
    active: pseudoHandler(":active"),
    visited: pseudoHandler(":visited"),
    target: pseudoHandler(":target"),
    first: {
      DEFAULT: pseudoHandler(":first-child"),
      of: {
        type: pseudoHandler(":first-of-type"),
      },
      letter: pseudoHandler("::first-letter"),
      line: pseudoHandler("::first-line"),
    },
    last: {
      DEFAULT: pseudoHandler(":last-child"),
      of: {
        type: pseudoHandler(":last-of-type"),
      },
    },
    only: {
      DEFAULT: pseudoHandler(":only-child"),
      of: {
        type: pseudoHandler(":only-of-type"),
      },
    },
    empty: pseudoHandler(":empty"),
    disabled: pseudoHandler(":disabled"),
    checked: pseudoHandler(":checked"),
    odd: pseudoHandler(":nth-child(odd)"),
    even: pseudoHandler(":nth-child(even)"),
    indeterminate: pseudoHandler(":indeterminate"),
    default: pseudoHandler(":default"),
    required: pseudoHandler(":required"),
    valid: pseudoHandler(":valid"),
    invalid: pseudoHandler(":invalid"),
    in: {
      range: pseudoHandler(":in-range"),
    },
    out: {
      of: {
        range: pseudoHandler(":out-of-range"),
      },
    },
    placeholder: {
      DEFAULT: pseudoHandler("::placeholder"),
      shown: pseudoHandler(":placeholder-shown"),
    },
    autofill: pseudoHandler(":autofill"),
    read: {
      only: pseudoHandler(":read-only"),
    },
    before: content,
    after: content,
    portrait: createMedia("(orientation: portrait)"),
    landscape: createMedia("(orientation: landscape)"),
    motion: {
      safe: createMedia("(prefers-reduced-motion: no-preference)"),
      reduce: createMedia("(prefers-reduced-motion: reduce)"),
    },
    print: createMedia("print"),

    // TODO(miyauci): add check the rule-set has valid declaration
    marker: pseudoHandler("::marker"),
    selection: pseudoHandler("::selection"),
    rtl: selectorTransform((selector) => `[dir="rtl"] ${selector}`),
    ltr: selectorTransform((selector) => `[dir="ltr"] ${selector}`),

    file: pseudoHandler("::file-selector-button"),
    "!": $important,
    "-": $minus,
    scrollbar,
    "scrollbar-track": scrollbarTrack,
    "scrollbar-thumb": scrollbarThumb,
    group,
  };
  return modifierMap;
}
