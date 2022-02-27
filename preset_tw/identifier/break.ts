import type { Identifier } from "../../core/types.ts";

export const $break: Identifier = {
  after: {
    auto: { "break-after": "auto" },
    avoid: {
      DEFAULT: { "break-after": "avoid" },
      page: { "break-after": "avoid-page" },
    },
    all: { "break-after": "all" },
    page: { "break-after": "page" },
    left: { "break-after": "left" },
    right: { "break-after": "right" },
    column: { "break-after": "column" },
  },
  before: {
    auto: { "break-before": "auto" },
    avoid: {
      DEFAULT: { "break-before": "avoid" },
      page: { "break-before": "avoid-page" },
    },
    all: { "break-before": "all" },
    page: { "break-before": "page" },
    left: { "break-before": "left" },
    right: { "break-before": "right" },
    column: { "break-before": "column" },
  },
  inside: {
    auto: { "break-inside": "auto" },
    avoid: {
      DEFAULT: { "break-inside": "avoid" },
      page: { "break-inside": "avoid-page" },
      column: { "break-inside": "avoid-column" },
    },
  },
  normal: { "word-break": "normal", "overflow-wrap": "normal" },
  words: { "overflow-wrap": "break-word" },
  all: { "word-break": "break-all" },
};
