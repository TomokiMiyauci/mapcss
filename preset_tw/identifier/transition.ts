import type { EntriesIdentifier } from "../../core/types.ts";

const transitionBase = {
  "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
  "transition-duration": "150ms",
};

export const transition: EntriesIdentifier = [
  ["DEFAULT", {
    "transition-property":
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    ...transitionBase,
  }],
  ["none", { "transition-property": "none" }],
  ["all", {
    "transition-property": "all",
    ...transitionBase,
  }],
  ["colors", {
    "transition-property":
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    ...transitionBase,
  }],
  ["opacity", {
    "transition-property": "opacity",
    ...transitionBase,
  }],
  ["shadow", {
    "transition-property": "box-shadow",
    ...transitionBase,
  }],
  ["transform", {
    "transition-property": "transform",
    ...transitionBase,
  }],
];
