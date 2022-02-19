import { re$Numeric } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { quoter, unit } from "../../core/utils/format.ts";
import type { EntriesSpecifier } from "../../core/types.ts";
import { associateWith } from "../../deps.ts";

const SCROLL_MARGIN = "scroll-margin";
const SCROLL_MARGIN_TOP = "scroll-margin-top";
const SCROLL_MARGIN_BOTTOM = "scroll-margin-bottom";
const SCROLL_MARGIN_LEFT = "scroll-margin-left";
const SCROLL_MARGIN_RIGHT = "scroll-margin-right";
const SCROLL_PADDING = "scroll-padding";
const SCROLL_PADDING_TOP = "scroll-padding-top";
const SCROLL_PADDING_BOTTOM = "scroll-padding-bottom";
const SCROLL_PADDING_LEFT = "scroll-padding-left";
const SCROLL_PADDING_RIGHT = "scroll-padding-right";

export const scroll: EntriesSpecifier = [
  ["auto", { "scroll-behavior": "auto" }],
  ["smooth", { "scroll-behavior": "smooth" }],
  ["m", [
    [0, { [SCROLL_MARGIN]: "0px" }],
    ["px", { [SCROLL_MARGIN]: "1px" }],
    [
      re$Numeric,
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
      re$Numeric,
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
      re$Numeric,
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
      re$Numeric,
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
      re$Numeric,
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
      re$Numeric,
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
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_MARGIN_LEFT]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["p", [
    [0, { [SCROLL_PADDING]: "0px" }],
    ["px", { [SCROLL_PADDING]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_PADDING]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["px", [
    [0, { [SCROLL_PADDING_LEFT]: "0px", [SCROLL_PADDING_RIGHT]: "0px" }],
    ["px", { [SCROLL_PADDING_LEFT]: "1px", [SCROLL_PADDING_RIGHT]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) =>
            associateWith(
              [SCROLL_PADDING_LEFT, SCROLL_PADDING_RIGHT],
              () => rem,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["py", [
    [0, { [SCROLL_PADDING_TOP]: "0px", [SCROLL_PADDING_BOTTOM]: "0px" }],
    ["px", { [SCROLL_PADDING_TOP]: "1px", [SCROLL_PADDING_BOTTOM]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) =>
            associateWith(
              [SCROLL_PADDING_TOP, SCROLL_PADDING_BOTTOM],
              () => rem,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["pt", [
    [0, { [SCROLL_PADDING_TOP]: "0px" }],
    ["px", { [SCROLL_PADDING_TOP]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_PADDING_TOP]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["pr", [
    [0, { [SCROLL_PADDING_RIGHT]: "0px" }],
    ["px", { [SCROLL_PADDING_RIGHT]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_PADDING_RIGHT]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["pb", [
    [0, { [SCROLL_PADDING_BOTTOM]: "0px" }],
    ["px", { [SCROLL_PADDING_BOTTOM]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_PADDING_BOTTOM]: rem }),
          none: undefined,
        }),
    ],
  ]],
  ["pl", [
    [0, { [SCROLL_PADDING_LEFT]: "0px" }],
    ["px", { [SCROLL_PADDING_LEFT]: "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(quoter).map(unit("rem")).match({
          some: (rem) => ({ [SCROLL_PADDING_LEFT]: rem }),
          none: undefined,
        }),
    ],
  ]],
];
