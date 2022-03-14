import type { CSSMap } from "../../core/types.ts";

export const $break: CSSMap = {
  after: {
    auto: { breakAfter: "auto" },
    avoid: {
      "": { breakAfter: "avoid" },
      page: { breakAfter: "avoid-page" },
    },
    all: { breakAfter: "all" },
    page: { breakAfter: "page" },
    left: { breakAfter: "left" },
    right: { breakAfter: "right" },
    column: { breakAfter: "column" },
  },
  before: {
    auto: { breakBefore: "auto" },
    avoid: {
      "": { breakBefore: "avoid" },
      page: { breakBefore: "avoid-page" },
    },
    all: { breakBefore: "all" },
    page: { breakBefore: "page" },
    left: { breakBefore: "left" },
    right: { breakBefore: "right" },
    column: { breakBefore: "column" },
  },
  inside: {
    auto: { breakInside: "auto" },
    avoid: {
      "": { breakInside: "avoid" },
      page: { breakInside: "avoid-page" },
      column: { breakInside: "avoid-column" },
    },
  },
  normal: { wordBreak: "normal", overflowWrap: "normal" },
  words: { overflowWrap: "break-word" },
  all: { wordBreak: "break-all" },
};
