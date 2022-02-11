import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { filterValue, handleFilter } from "./_filter_utils.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  RecordSpecifier,
  Specifier,
} from "../../core/types.ts";
import {
  customPropertySet,
  handleTransform,
  transformValue,
} from "./_utils.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reSlashNumber,
} from "../../core/utils/regexp.ts";

export const block: CSSObject = { display: "block" };
export const isolate: CSSObject = { isolation: "isolate" };
export const isolation: Specifier = {
  auto: {
    isolation: "auto",
  },
};
export const $static: CSSObject = {
  position: "static",
};
export const fixed: CSSObject = {
  position: "fixed",
};
export const absolute: CSSObject = {
  position: "absolute",
};
export const relative: CSSObject = {
  position: "relative",
};
export const sticky: CSSObject = {
  position: "sticky",
};
export const visible: CSSObject = {
  visibility: "visible",
};
export const invisible: CSSObject = {
  visibility: "hidden",
};
export const antialiased: CSSObject = {
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
};
export const subpixel: Specifier = {
  antialiased: {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
  },
};
export const italic: CSSObject = {
  "font-style": "italic",
};
export const contents: CSSObject = {
  display: "contents",
};
export const hidden: CSSObject = {
  display: "none",
};
export const overline: CSSObject = {
  "text-decoration-line": "overline",
};
export const line: Specifier = {
  through: { "text-decoration-line": "line-through" },
};
export const no: Specifier = {
  underline: { "text-decoration-line": "none" },
};
export const sr: Specifier = {
  only: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    "white-space": "nowrap",
    "border-width": 0,
  },
};
export const ordinal: CSSObject = { "font-variant-numeric": "ordinal" };
export const slashed: RecordSpecifier = {
  zero: { "font-variant-numeric": "slashed-zero" },
};
export const lining: RecordSpecifier = {
  nums: { "font-variant-numeric": "lining-nums" },
};
export const oldstyle: RecordSpecifier = {
  nums: { "font-variant-numeric": "oldstyle-nums" },
};
export const proportional: RecordSpecifier = {
  nums: { "font-variant-numeric": "proportional-nums" },
};
export const tabular: RecordSpecifier = {
  nums: { "font-variant-numeric": "tabular-nums" },
};
export const diagonal: RecordSpecifier = {
  fractions: { "font-variant-numeric": "diagonal-fractions" },
};
export const stacked: RecordSpecifier = {
  fractions: { "font-variant-numeric": "stacked-fractions" },
};
export const uppercase: CSSObject = { "text-transform": "uppercase" };
export const lowercase: CSSObject = { "text-transform": "lowercase" };
export const capitalize: CSSObject = { "text-transform": "capitalize" };
export const truncate: CSSObject = {
  overflow: "hidden",
  "text-overflow": "ellipsis",
  "white-space": "nowrap",
};
export const brightness: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (value) =>
          handleSingleFilter("brightness", value, variablePrefix),
        none: undefined,
      }),
  ],
];

export const contrast: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      handleFilter("contrast", pNumber, variablePrefix),
  ],
];

function handleDrop(value: string, varPrefix: string): CSSObject {
  return {
    [customProperty("drop-shadow", varPrefix)]: value,
    filter: filterValue(varPrefix),
  };
}

export const drop: RecordSpecifier = {
  shadow: {
    DEFAULT: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
        variablePrefix,
      ),
    sm: (_, { variablePrefix }) =>
      handleDrop("drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))", variablePrefix),
    md: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
        variablePrefix,
      ),
    lg: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
        variablePrefix,
      ),
    xl: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
        variablePrefix,
      ),
    "2xl": (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        variablePrefix,
      ),
    none: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 0 #0000)",
        variablePrefix,
      ),
  },
};

export const grayscale: EntriesSpecifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("grayscale", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) =>
      handleSingleFilter("grayscale", 0, variablePrefix),
  ],
];

function handleSingleFilter(
  propertyName: string,
  value: string | number,
  varPrefix: string,
): CSSObject {
  return {
    [customProperty(propertyName, varPrefix)]: `${propertyName}(${value})`,
    filter: filterValue(varPrefix),
  };
}

export const hue: RecordSpecifier = {
  rotate: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleSingleFilter("hue-rotate", deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const invert: EntriesSpecifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("invert", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) => handleSingleFilter("invert", 0, variablePrefix),
  ],
];

export const saturate: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (saturate) =>
          handleSingleFilter("saturate", saturate, variablePrefix),
        none: undefined,
      }),
  ],
];

export const sepia: EntriesSpecifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("sepia", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) => handleSingleFilter("sepia", 0, variablePrefix),
  ],
];

export const duration: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-duration": ms }),
        none: undefined,
      }),
  ],
];

export const ease: RecordSpecifier = {
  linear: { "transition-timing-function": "linear" },
  in: {
    DEFAULT: { "transition-timing-function": "cubic-bezier(0.4, 0, 1, 1)" },
    out: { "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  out: { "transition-timing-function": "cubic-bezier(0, 0, 0.2, 1)" },
};

export const delay: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-delay": ms }),
        none: undefined,
      }),
  ],
];

export const rotate: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(unit("deg")).match({
        some: (deg) => ({
          [customProperty("rotate", variablePrefix)]: deg,
          transform: transformValue(variablePrefix),
        }),
        none: undefined,
      }),
  ],
];

export const skew: RecordSpecifier = {
  x: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-x"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
  y: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-y"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const origin: RecordSpecifier = {
  center: { "transform-origin": "center" },
  left: { "transform-origin": "left" },
  right: { "transform-origin": "right" },
  top: {
    DEFAULT: { "transform-origin": "top" },
    right: { "transform-origin": "top right" },
    left: { "transform-origin": "top left" },
  },
  bottom: {
    DEFAULT: { "transform-origin": "bottom" },
    right: { "transform-origin": "bottom right" },
    left: { "transform-origin": "bottom left" },
  },
};

function toAccentColor(color: string): { "accent-color": string } {
  return { "accent-color": color };
}
export const accent: EntriesSpecifier = [
  ["auto", { "accent-color": "auto" }],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toAccentColor,
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
      some: toAccentColor,
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
          some: toAccentColor,
          none: () => toAccentColor(color),
        });
    },
  ],
];
export const appearance: RecordSpecifier = {
  none: { appearance: "none" },
};
export const cursor: RecordSpecifier = {
  auto: { cursor: "auto" },
  default: { cursor: "default" },
  pointer: { cursor: "pointer" },
  wait: { cursor: "wait" },
  text: { cursor: "text" },
  move: { cursor: "move" },
  help: { cursor: "help" },
  none: { cursor: "none" },
  progress: { cursor: "progress" },
  cell: { cursor: "cell" },
  crosshair: { cursor: "crosshair" },
  vertical: {
    text: { cursor: "vertical-text" },
  },
  alias: { cursor: "alias" },
  copy: { cursor: "copy" },
  no: {
    drop: { cursor: "no-drop" },
  },
  context: {
    menu: { cursor: "context-menu" },
  },
  grab: { cursor: "grab" },
  grabbing: { cursor: "grabbing" },
  all: {
    scroll: { cursor: "all-scroll" },
  },
  col: {
    resize: { cursor: "col-resize" },
  },
  row: {
    resize: { cursor: "row-resize" },
  },
  n: {
    resize: { cursor: "n-resize" },
  },
  e: {
    resize: { cursor: "e-resize" },
  },
  s: {
    resize: { cursor: "s-resize" },
  },
  w: {
    resize: { cursor: "w-resize" },
  },
  ne: {
    resize: { cursor: "ne-resize" },
  },
  nw: {
    resize: { cursor: "nw-resize" },
  },
  se: {
    resize: { cursor: "se-resize" },
  },
  sw: {
    resize: { cursor: "sw-resize" },
  },
  ew: {
    resize: { cursor: "ew-resize" },
  },
  ns: {
    resize: { cursor: "ns-resize" },
  },
  nesw: {
    resize: { cursor: "nesw-resize" },
  },
  nwse: {
    resize: { cursor: "nwse-resize" },
  },
  zoom: {
    in: { cursor: "zoom-in" },
    out: { cursor: "zoom-out" },
  },
  not: {
    allowed: { cursor: "not-allowed" },
  },
};
function toCaretColor(color: string) {
  return { "caret-color": color };
}
export const caret: EntriesSpecifier = [
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toCaretColor,
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
      some: toCaretColor,
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
          some: toCaretColor,
          none: () => toCaretColor(color),
        });
    },
  ],
];
export const pointer: RecordSpecifier = {
  events: {
    none: { "pointer-events": "none" },
    auto: { "pointer-events": "auto" },
  },
};
export const resize: RecordSpecifier = {
  DEFAULT: { resize: "both" },
  none: { resize: "none" },
  x: { resize: "horizontal" },
  y: { resize: "vertical" },
};
export const touch: RecordSpecifier = {
  auto: { "touch-action": "auto" },
  none: { "touch-action": "none" },
  manipulation: { "touch-action": "manipulation" },
  pan: {
    x: { "touch-action": "pan-x" },
    y: { "touch-action": "pan-y" },
    left: { "touch-action": "pan-left" },
    right: { "touch-action": "pan-right" },
    up: { "touch-action": "pan-up" },
    down: { "touch-action": "pan-down" },
  },
  pinch: {
    zoom: { "touch-action": "pinch-zoom" },
  },
};

export const select: RecordSpecifier = {
  none: { "user-select": "none" },
  text: { "user-select": "text" },
  all: { "user-select": "all" },
  auto: { "user-select": "auto" },
};
export const will: RecordSpecifier = {
  change: {
    auto: { "will-change": "auto" },
    scroll: { "will-change": "scroll-position" },
    contents: { "will-change": "contents" },
    transform: { "will-change": "transform" },
  },
};
function toFill(color: string) {
  return { fill: color };
}
export const fill: EntriesSpecifier = [
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toFill,
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
      some: toFill,
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
          some: toFill,
          none: () => toFill(color),
        });
    },
  ],
];

function varGradient(varPrefix: string) {
  const [varGradientFrom, varFnGradientFrom] = customPropertySet(
    "gradient-from",
    varPrefix,
  );
  const [varGradientStops] = customPropertySet(
    "gradient-stops",
    varPrefix,
  );
  const [varGradientTo] = customPropertySet(
    "gradient-to",
    varPrefix,
  );
  return {
    varGradientFrom,
    varFnGradientFrom,
    varGradientStops,
    varGradientTo,
  };
}
function defaultGradientColor(isRGB: boolean, color: string): string {
  // transparent is special as default color
  return isRGB
    ? color
    : color === "transparent"
    ? "rgb(0 0 0/0)"
    : "rgb(255 255 255/0)";
}

export const from: EntriesSpecifier = [
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      const _color = parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: (color) => [true, color] as [boolean, string],
          none: [false, color] as [boolean, string],
        });

      const defaultColor = defaultGradientColor(_color[0], _color[1]);

      const {
        varFnGradientFrom,
        varGradientFrom,
        varGradientStops,
        varGradientTo,
      } = varGradient(context.variablePrefix);

      return {
        [varGradientFrom]: _color[1],
        [varGradientStops]:
          `${varFnGradientFrom}, var(${varGradientTo}, ${defaultColor})`,
      };
    },
  ],
];
export const via: EntriesSpecifier = [
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      const _color = parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: (color) => [true, color] as [boolean, string],
          none: [false, color] as [boolean, string],
        });

      const defaultColor = defaultGradientColor(_color[0], _color[1]);

      const {
        varFnGradientFrom,
        varGradientStops,
        varGradientTo,
      } = varGradient(context.variablePrefix);

      return {
        [varGradientStops]: `${varFnGradientFrom}, ${
          _color[1]
        }, var(${varGradientTo}, ${defaultColor})`,
      };
    },
  ],
];
export const to: EntriesSpecifier = [
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      const _color = parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: (color) => color,
          none: color,
        });
      const { varGradientTo } = varGradient(context.variablePrefix);
      return {
        [varGradientTo]: _color,
      };
    },
  ],
];