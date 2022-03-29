// This module is browser compatible.

import { $2xl, lg, md, sm, xl } from "./breakpoint.ts";
import { createDark } from "./color_scheme.ts";
import { scrollbar, scrollbarThumb, scrollbarTrack } from "./pseudo.ts";
import { createMedia } from "./at_rule.ts";
import { content } from "./pseudo_elements.ts";
import { $important } from "./important.ts";
import { $minus } from "./minus.ts";
import { group } from "./group.ts";
import { selectorTransform } from "./_utils.ts";
import type { Option } from "../types.ts";
import type { ModifierMap } from "./../../core/types.ts";

function prefix(prefix: string) {
  return (value: string): string => `${prefix}${value}`;
}

function suffix(suffix: string) {
  return (value: string): string => `${value}${suffix}`;
}

export function createModifierMap(darkMode: Option["darkMode"]): ModifierMap {
  const modifierMap: ModifierMap = {
    sm,
    md,
    lg,
    xl,
    dark: createDark(darkMode),
    "2xl": $2xl,
    hover: selectorTransform(suffix(":hover")),
    focus: {
      "": selectorTransform(suffix(":focus")),
      within: selectorTransform(suffix(":focus-within")),
      visible: selectorTransform(suffix(":focus-visible")),
    },
    open: selectorTransform(suffix("[open]")),
    active: selectorTransform(suffix(":active")),
    visited: selectorTransform(suffix(":visited")),
    target: selectorTransform(suffix(":target")),
    first: {
      "": selectorTransform(suffix(":first-child")),
      of: {
        type: selectorTransform(suffix(":first-of-type")),
      },
      letter: selectorTransform(suffix("::first-letter")),
      line: selectorTransform(suffix("::first-line")),
    },
    last: {
      "": selectorTransform(suffix(":last-child")),
      of: {
        type: selectorTransform(suffix(":last-of-type")),
      },
    },
    only: {
      "": selectorTransform(suffix(":only-child")),
      of: {
        type: selectorTransform(suffix(":only-of-type")),
      },
    },
    empty: selectorTransform(suffix(":empty")),
    disabled: selectorTransform(suffix(":disabled")),
    checked: selectorTransform(suffix(":checked")),
    odd: selectorTransform(suffix(":nth-child(odd)")),
    even: selectorTransform(suffix(":nth-child(even)")),
    indeterminate: selectorTransform(suffix(":indeterminate")),
    default: selectorTransform(suffix(":default")),
    required: selectorTransform(suffix(":required")),
    valid: selectorTransform(suffix(":valid")),
    invalid: selectorTransform(suffix(":invalid")),
    in: {
      range: selectorTransform(suffix(":in-range")),
    },
    out: {
      of: {
        range: selectorTransform(suffix(":out-of-range")),
      },
    },
    placeholder: {
      "": selectorTransform(suffix("::placeholder")),
      shown: selectorTransform(suffix(":placeholder-shown")),
    },
    autofill: selectorTransform(suffix(":autofill")),
    read: {
      only: selectorTransform(suffix(":read-only")),
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
    marker: selectorTransform(suffix("::marker")),
    selection: selectorTransform(suffix("::selection")),
    rtl: selectorTransform(prefix('[dir="rtl"] ')),
    ltr: selectorTransform(prefix('[dir="ltr"] ')),

    file: selectorTransform(suffix("::file-selector-button")),
    "!": $important,
    "-": $minus,
    scrollbar,
    "scrollbar-track": scrollbarTrack,
    "scrollbar-thumb": scrollbarThumb,
    group,
  };
  return modifierMap;
}
