import { matcher, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reNumeric,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { Specifier } from "../../core/types.ts";

const BORDER_WIDTH = "border-width";

export const border: Specifier = [
  ["DEFAULT", { [BORDER_WIDTH]: "1px" }],
  ["solid", { "border-style": "solid" }],
  ["dashed", { "border-style": "dashed" }],
  ["dotted", { "border-style": "dotted" }],
  ["double", { "border-style": "double" }],
  ["hidden", { "border-style": "hidden" }],
  ["none", { "border-style": "none" }],
  ["collapse", { "border-collapse": "collapse" }],
  ["separate", { "border-collapse": "separate" }],
  ["x", [
    ["DEFAULT", {
      "border-left-width": "1px",
      "border-right-width": "1px",
    }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(
          matcher(["border-left-width", "border-right-width"]),
        ),
    ],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
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
    [re$SlashBracket$, ([, body, alpha], context) => {
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
      reAll,
      ([body], context) => {
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
  ]],
  ["y", [
    ["DEFAULT", {
      "border-top-width": "1px",
      "border-bottom-width": "1px",
    }],
    [reSlashNumber, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(alpha).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
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
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(
          matcher(["border-top-width", "border-bottom-width"]),
        ),
    ],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
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
    [re$SlashBracket$, ([, body, alpha], context) => {
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
      reAll,
      ([body], context) => {
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
  ]],
  ["t", [
    ["DEFAULT", { "border-top-width": "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(matcher("border-top-width")),
    ],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
            {
              some: (color) => ({ "border-top-color": color }),
              none: undefined,
            },
          ),
        none: undefined,
      });
    }],
    [re$SlashBracket$, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;
      return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
        .map(
          rgbFn,
        ).match({
          some: (color) => ({ "border-top-color": color }),
          none: undefined,
        });
    }],
    [
      reAll,
      ([body], context) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseColor(color).map(completionRGBA(1, true))
          .map(rgbFn)
          .match({
            some: (color) => ({ "border-top-color": color }),
            none: ({ "border-top-color": color }),
          });
      },
    ],
  ]],
  ["r", [
    ["DEFAULT", { "border-right-width": "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(matcher("border-right-width")),
    ],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
            {
              some: (color) => ({ "border-right-color": color }),
              none: undefined,
            },
          ),
        none: undefined,
      });
    }],
    [re$SlashBracket$, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;
      return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
        .map(
          rgbFn,
        ).match({
          some: (color) => ({ "border-right-color": color }),
          none: undefined,
        });
    }],
    [
      reAll,
      ([body], context) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseColor(color).map(completionRGBA(1, true))
          .map(rgbFn)
          .match({
            some: (color) => ({ "border-right-color": color }),
            none: ({ "border-right-color": color }),
          });
      },
    ],
  ]],
  ["b", [
    ["DEFAULT", { "border-bottom-width": "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(matcher("border-bottom-width")),
    ],
    [re$SlashBracket$, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;
      return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
        .map(
          rgbFn,
        ).match({
          some: (color) => ({ "border-bottom-color": color }),
          none: undefined,
        });
    }],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
            {
              some: (color) => ({ "border-bottom-color": color }),
              none: undefined,
            },
          ),
        none: undefined,
      });
    }],
    [
      reAll,
      ([body], context) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseColor(color).map(completionRGBA(1, true))
          .map(rgbFn)
          .match({
            some: (color) => ({ "border-bottom-color": color }),
            none: ({ "border-bottom-color": color }),
          });
      },
    ],
  ]],
  ["l", [
    ["DEFAULT", { "border-left-width": "1px" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(matcher("border-left-width")),
    ],
    [reSlashNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
            {
              some: (color) => ({ "border-left-color": color }),
              none: undefined,
            },
          ),
        none: undefined,
      });
    }],
    [re$SlashBracket$, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;
      return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
        .map(
          rgbFn,
        ).match({
          some: (color) => ({ "border-left-color": color }),
          none: undefined,
        });
    }],
    [
      reAll,
      ([body], context) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseColor(color).map(completionRGBA(1, true))
          .map(rgbFn)
          .match({
            some: (color) => ({ "border-left-color": color }),
            none: ({ "border-left-color": color }),
          });
      },
    ],
  ]],
  [
    reNumeric,
    ([, numeric]) =>
      parseNumeric(numeric).map(shortDecimal).map(unit("px")).match(
        matcher(BORDER_WIDTH),
      ),
  ],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: (color) => ({ "border-color": color }),
          none: undefined,
        }),
      none: undefined,
    });
  }],
  [re$SlashBracket$, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha })).map(
      rgbFn,
    ).match({
      some: (color) => ({ "border-color": color }),
      none: undefined,
    });
  }],
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: (color) => ({ "border-color": color }),
          none: ({ "border-color": color }),
        });
    },
  ],
];
