import type { EntriesSpecifier } from "../../core/types.ts";

export const mix: EntriesSpecifier = [
  ["blend", {
    normal: { "mix-blend-mode": "normal" },
    multiply: { "mix-blend-mode": "multiply" },
    screen: { "mix-blend-mode": "screen" },
    overlay: { "mix-blend-mode": "overlay" },
    darken: { "mix-blend-mode": "darken" },
    lighten: { "mix-blend-mode": "lighten" },
    hue: { "mix-blend-mode": "hue" },
    saturation: { "mix-blend-mode": "saturation" },
    luminosity: { "mix-blend-mode": "luminosity" },
    difference: { "mix-blend-mode": "difference" },
    exclusion: { "mix-blend-mode": "exclusion" },
    color: {
      DEFAULT: { "mix-blend-mode": "color" },
      dodge: { "mix-blend-mode": "color-dodge" },
      burn: { "mix-blend-mode": "color-burn" },
    },
    hard: {
      light: { "mix-blend-mode": "hard-light" },
    },
    soft: {
      light: { "mix-blend-mode": "soft-light" },
    },
  }],
];
