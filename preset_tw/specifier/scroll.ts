import { reNumeric } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { quoter, unit } from "../../core/utils/format.ts";
import type { EntriesSpecifier } from "../../core/types.ts";
import { associateWith } from "../../deps.ts";

const SCROLL_MARGIN = "scroll-margin";
const SCROLL_MARGIN_TOP = "scroll-margin-top";
const SCROLL_MARGIN_BOTTOM = "scroll-margin-bottom";
const SCROLL_MARGIN_LEFT = "scroll-margin-left";
const SCROLL_MARGIN_RIGHT = "scroll-margin-right";

export const scroll: EntriesSpecifier = [
  ["auto", { "scroll-behavior": "auto" }],
  ["smooth", { "scroll-behavior": "smooth" }],
  ["m", [
    [0, { [SCROLL_MARGIN]: "0px" }],
    ["px", { [SCROLL_MARGIN]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["mx", [
    [0, { [SCROLL_MARGIN_LEFT]: "0px", [SCROLL_MARGIN_RIGHT]: "0px" }],
    ["px", { [SCROLL_MARGIN_LEFT]: "1px", [SCROLL_MARGIN_RIGHT]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) =>
            associateWith(
              [SCROLL_MARGIN_LEFT, SCROLL_MARGIN_RIGHT],
              () => rem,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["my", [
    [0, { [SCROLL_MARGIN_TOP]: "0px", [SCROLL_MARGIN_BOTTOM]: "0px" }],
    ["px", { [SCROLL_MARGIN_TOP]: "1px", [SCROLL_MARGIN_BOTTOM]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) =>
            associateWith(
              [SCROLL_MARGIN_TOP, SCROLL_MARGIN_BOTTOM],
              () => rem,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["mt", [
    [0, { [SCROLL_MARGIN_TOP]: "0px" }],
    ["px", { [SCROLL_MARGIN_TOP]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN_TOP]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["mr", [
    [0, { [SCROLL_MARGIN_RIGHT]: "0px" }],
    ["px", { [SCROLL_MARGIN_RIGHT]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN_RIGHT]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["mb", [
    [0, { [SCROLL_MARGIN_BOTTOM]: "0px" }],
    ["px", { [SCROLL_MARGIN_BOTTOM]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN_BOTTOM]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["ml", [
    [0, { [SCROLL_MARGIN_LEFT]: "0px" }],
    ["px", { [SCROLL_MARGIN_LEFT]: "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN_LEFT]: rem }),
          none: undefined,
        }),
    ],
  ]],
];
