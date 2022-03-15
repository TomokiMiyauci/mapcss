import { matcher, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$Numeric,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

const BORDER_WIDTH = "border-width";

export const border: CSSMap = {
  "": { [BORDER_WIDTH]: "1px" },
  solid: { borderStyle: "solid" },
  dashed: { borderStyle: "dashed" },
  dotted: { borderStyle: "dotted" },
  double: { borderStyle: "double" },
  hidden: { borderStyle: "hidden" },
  none: { borderStyle: "none" },
  collapse: { borderCollapse: "collapse" },
  separate: { borderCollapse: "separate" },
  x: {
    "": {
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
    },
    "*": ({ id }, context) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher(["border-left-width", "border-right-width"]),
            ),
        ],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) =>
                      associateWith(
                        ["border-right-color", "border-left-color"],
                        () => color,
                      ),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) =>
                associateWith(
                  ["border-right-color", "border-left-color"],
                  () => color,
                ),
              none: undefined,
            });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) =>
                  associateWith(
                    ["border-right-color", "border-left-color"],
                    () => color,
                  ),
                none: () =>
                  associateWith(
                    ["border-right-color", "border-left-color"],
                    () => color,
                  ),
              });
          },
        ],
      ]),
  },
  y: {
    "": {
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
    },
    "*": ({ id }, context) =>
      execMatch(id, [
        [re$AllPer$PositiveNumber, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(alpha).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) =>
                      associateWith(
                        ["border-top-color", "border-bottom-color"],
                        () => color,
                      ),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher(["border-top-width", "border-bottom-width"]),
            ),
        ],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) =>
                      associateWith(
                        ["border-top-color", "border-bottom-color"],
                        () => color,
                      ),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) =>
                associateWith(
                  ["border-top-color", "border-bottom-color"],
                  () => color,
                ),
              none: undefined,
            });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) =>
                  associateWith(
                    ["border-top-color", "border-bottom-color"],
                    () => color,
                  ),
                none: () =>
                  associateWith(
                    ["border-top-color", "border-bottom-color"],
                    () => color,
                  ),
              });
          },
        ],
      ]),
  },
  t: {
    "": { borderTopWidth: "1px" },
    "*": ({ id }, context) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(matcher("border-top-width")),
        ],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) => ({ borderTopColor: color }),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) => ({ borderTopColor: color }),
              none: undefined,
            });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) => ({ borderTopColor: color }),
                none: ({ borderTopColor: color }),
              });
          },
        ],
      ]),
  },
  r: {
    "": { borderRightWidth: "1px" },
    "*": ({ id }, context) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher("border-right-width"),
            ),
        ],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) => ({ borderRightColor: color }),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) => ({ borderRightColor: color }),
              none: undefined,
            });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) => ({ borderRightColor: color }),
                none: ({ borderRightColor: color }),
              });
          },
        ],
      ]),
  },
  b: {
    "": { borderBottomWidth: "1px" },
    "*": ({ id }, context) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher("border-bottom-width"),
            ),
        ],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) => ({ borderBottomColor: color }),
              none: undefined,
            });
        }],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) => ({ borderBottomColor: color }),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) => ({ borderBottomColor: color }),
                none: ({ borderBottomColor: color }),
              });
          },
        ],
      ]),
  },
  l: {
    "": { borderLeftWidth: "1px" },
    "*": ({ id }, context) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher("border-left-width"),
            ),
        ],
        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: (color) => ({ borderLeftColor: color }),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;
          return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
            .map(
              rgbFn,
            ).match({
              some: (color) => ({ borderLeftColor: color }),
              none: undefined,
            });
        }],
        [
          re$All,
          ([body]) => {
            const color = resolveTheme(body, "color", context);
            if (isUndefined(color)) return;

            return parseColor(color).map(completionRGBA(1, true))
              .map(rgbFn)
              .match({
                some: (color) => ({ borderLeftColor: color }),
                none: ({ borderLeftColor: color }),
              });
          },
        ],
      ]),
  },
  "*": ({ id }, context) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).map(shortDecimal).map(unit("px")).match(
            matcher(BORDER_WIDTH),
          ),
      ],
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: (color) => ({ borderColor: color }),
                none: undefined,
              }),
          none: undefined,
        });
      }],
      [re$AllPerBracket_$, ([, body, alpha]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;
        return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
          .map(
            rgbFn,
          ).match({
            some: (color) => ({ borderColor: color }),
            none: undefined,
          });
      }],
      [
        re$All,
        ([body]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseColor(color).map(completionRGBA(1, true))
            .map(rgbFn)
            .match({
              some: (color) => ({ borderColor: color }),
              none: ({ borderColor: color }),
            });
        },
      ],
    ]),
};
