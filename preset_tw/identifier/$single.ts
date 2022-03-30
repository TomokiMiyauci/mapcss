// This module is browser compatible.

import { filterValue, handleFilter } from "./_filter_utils.ts";
import {
  parseColor,
  parseFraction,
  parseNumeric,
  per,
} from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { CSSMap, DeclBlock } from "../../core/types.ts";
import {
  customPropertySet,
  handleTransform,
  matcher,
  percentize,
  remify,
  transformValue,
} from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$Numeric,
  re$PositiveNumber,
  re$PositiveNumberPer$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import {
  accentColorAuto,
  alignItemsBaseline,
  alignItemsCenter,
  alignItemsFlexEnd,
  alignItemsFlexStart,
  alignItemsStretch,
  appearanceNone,
  aspectRatioAuto,
  aspectRatioSquare,
  aspectRatioVideo,
  bottom0px,
  bottom100pct,
  bottom1px,
  bottomAuto,
  clearBoth,
  clearLeft,
  clearNone,
  clearRight,
  columns16rem,
  columns18rem,
  columns20rem,
  columns24rem,
  columns28rem,
  columns32rem,
  columns36rem,
  columns42rem,
  columns48rem,
  columns56rem,
  columns64rem,
  columns72rem,
  columns80rem,
  columnsAuto,
  cursorAlias,
  cursorAllScroll,
  cursorAuto,
  cursorCell,
  cursorColResize,
  cursorContentMenu,
  cursorCopy,
  cursorCrosshair,
  cursorDefault,
  cursorEResize,
  cursorEwResize,
  cursorGrab,
  cursorGrabbing,
  cursorHelp,
  cursorMove,
  cursorNeResize,
  cursorNeswResize,
  cursorNoDrop,
  cursorNone,
  cursorNotAllowed,
  cursorNResize,
  cursorNsResize,
  cursorNwResize,
  cursorNwseResize,
  cursorPointer,
  cursorProgress,
  cursorRowResize,
  cursorSeResize,
  cursorSResize,
  cursorSwResize,
  cursorText,
  cursorVerticalText,
  cursorWait,
  cursorWResize,
  cursorZoomIn,
  cursorZoomOut,
  displayBlock,
  displayContents,
  displayFlowRoot,
  displayInline,
  displayInlineBlock,
  displayInlineFlex,
  displayInlineGrid,
  displayInlineTable,
  displayNone,
  flexBasis0px,
  flexBasis100Pct,
  flexBasis1Px,
  flexBasisAuto,
  flexShrink1,
  floatLeft,
  floatNone,
  floatRight,
  fontStyleItalic,
  fontVariantNumericDiagonalFractions,
  fontVariantNumericLiningNums,
  fontVariantNumericOldstyleNums,
  fontVariantNumericOrdinal,
  fontVariantNumericProportionalNums,
  fontVariantNumericSlashedZero,
  fontVariantNumericStackedFractions,
  fontVariantNumericTabularNums,
  height0px,
  height100pct,
  height100vh,
  height1px,
  heightAuto,
  heightFitContent,
  heightMaxContent,
  heightMinContent,
  isolationAuto,
  isolationIsolate,
  left0px,
  left100pct,
  left1px,
  leftAuto,
  letterSpacingNormal,
  letterSpacingTight,
  letterSpacingTighter,
  letterSpacingWide,
  letterSpacingWider,
  letterSpacingWidest,
  lineHeight1,
  lineHeightLoose,
  lineHeightNormal,
  lineHeightRelaxed,
  lineHeightSnug,
  lineHeightTight,
  margin0px,
  margin1px,
  margin_1px,
  marginAuto,
  marginBottom0px,
  marginBottom1px,
  marginBottomAuto,
  marginLeft0px,
  marginLeft1px,
  marginLeftAuto,
  marginRight0px,
  marginRight1px,
  marginRightAuto,
  marginTop0px,
  marginTop1px,
  marginTopAuto,
  mixBlendModeColor,
  mixBlendModeColorBurn,
  mixBlendModeColorDodge,
  mixBlendModeDarken,
  mixBlendModeDifference,
  mixBlendModeExclusion,
  mixBlendModeHardLight,
  mixBlendModeHue,
  mixBlendModeLighten,
  mixBlendModeLuminosity,
  mixBlendModeMultiply,
  mixBlendModeNormal,
  mixBlendModeOverlay,
  mixBlendModeSaturation,
  mixBlendModeScreen,
  mixBlendModeSoftLight,
  MozOsxFontSmoothingAuto,
  MozOsxFontSmoothingGrayscale,
  order0,
  orderFirst,
  orderLast,
  overflowHidden,
  padding0,
  padding0px,
  padding1px,
  paddingAuto,
  paddingBottom0px,
  paddingBottom1px,
  paddingBottomAuto,
  paddingLeft0px,
  paddingLeft1px,
  paddingLeftAuto,
  paddingRight0px,
  paddingRight1px,
  paddingRightAuto,
  paddingTop0px,
  paddingTop1px,
  paddingTopAuto,
  positionAbsolute,
  positionFixed,
  positionRelative,
  positionStatic,
  positionSticky,
  right0px,
  right100pct,
  right1px,
  rightAuto,
  textDecorationLineLineThrough,
  textDecorationLineNone,
  textDecorationLineOverline,
  textIndent0px,
  textIndent1px,
  textTransformCapitalize,
  textTransformLowercase,
  textTransformUppercase,
  top0px,
  top100pct,
  top1px,
  topAuto,
  transformOriginBottom,
  transformOriginBottomLeft,
  transformOriginBottomRight,
  transformOriginCenter,
  transformOriginLeft,
  transformOriginRight,
  transformOriginTop,
  transformOriginTopLeft,
  transformOriginTopRight,
  transitionTimingFunctionLinear,
  verticalAlginSub,
  verticalAlginSuper,
  verticalAlginTextBottom,
  verticalAlignBaseline,
  verticalAlignBottom,
  verticalAlignMiddle,
  verticalAlignTextTop,
  verticalAlignTop,
  visibilityHidden,
  visibilityVisible,
  WebkitFontSmoothingAntialiased,
  WebkitFontSmoothingAuto,
  whiteSpaceNormal,
  whiteSpaceNowrap,
  whiteSpacePre,
  whiteSpacePreLine,
  whiteSpacePreWrap,
  width0px,
  width100pec,
  width100vw,
  width1px,
  widthAuto,
  widthFitContent,
  widthMaxContent,
  widthMinContent,
  zIndexAuto,
} from "../css/mod.ts";

export const align: CSSMap = {
  baseline: verticalAlignBaseline,
  top: verticalAlignTop,
  middle: verticalAlignMiddle,
  bottom: verticalAlignBottom,
  text: {
    top: verticalAlignTextTop,
    bottom: verticalAlginTextBottom,
  },
  sub: verticalAlginSub,
  super: verticalAlginSuper,
};

export const aspect: CSSMap = {
  auto: aspectRatioAuto,
  square: aspectRatioSquare,
  video: aspectRatioVideo,
  "*": ({ id }) =>
    execMatch(id, [
      [reBracket_$, ([, body]) => ({ aspectRatio: body })],
    ]),
};

export const basis: CSSMap = {
  0: flexBasis0px,
  px: flexBasis1Px,
  auto: flexBasisAuto,
  full: flexBasis100Pct,
  "*": ({ id }) =>
    execMatch(id, [[
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher("flex-basis")),
    ], [
      re$AllPer$PositiveNumber,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["flex-basis"]),
        ),
    ], [reBracket_$, ([, arbitrary]) => ({ "flex-basis": arbitrary })]]),
};

export const block = displayBlock;

export const bottom: CSSMap = {
  0: bottom0px,
  px: bottom1px,
  auto: bottomAuto,
  full: bottom100pct,
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumberPer$PositiveNumber,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["bottom"]),
        ),
    ], [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher(["bottom"])),
    ], [
      reBracket_$,
      ([, attr]) => ({ bottom: attr }),
    ]]),
};

export const container: CSSMap = {
  "": (_, context) => {
    const SCREEN = "screen";
    const sm = resolveTheme("sm", SCREEN, context);
    const md = resolveTheme("md", SCREEN, context);
    const lg = resolveTheme("lg", SCREEN, context);
    const xl = resolveTheme("xl", SCREEN, context);
    const $2xl = resolveTheme("2xl", SCREEN, context);

    const { className } = context;
    const media = (size: string) => ({
      [`@media (min-width: ${size})`]: { [className]: { "max-width": size } },
    });

    if (sm && md && lg && xl && $2xl) {
      return {
        type: "css",
        value: {
          [className]: {
            width: "100%",
          },
          ...media(sm),
          ...media(md),
          ...media(lg),
          ...media(xl),
          ...media($2xl),
        },
      };
    }
  },
};

export const clear: CSSMap = {
  right: clearRight,
  left: clearLeft,
  both: clearBoth,
  none: clearNone,
};

export const columns: CSSMap = {
  auto: columnsAuto,
  "3xs": columns16rem,
  "2xs": columns18rem,
  xs: columns20rem,
  sm: columns24rem,
  md: columns28rem,
  lg: columns32rem,
  xl: columns36rem,
  "2xl": columns42rem,
  "3xl": columns48rem,
  "4xl": columns56rem,
  "5xl": columns64rem,
  "6xl": columns72rem,
  "7xl": columns80rem,
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumber,
      ([, n]) => parseNumeric(n).match(matcher("columns")),
    ], [reBracket_$, ([, arbitrary]) => ({ "columns": arbitrary })]]),
};

export const float: CSSMap = {
  right: floatRight,
  left: floatLeft,
  none: floatNone,
};

export const grow: CSSMap = {
  "": { flexGrow: 1 },
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-grow")),
    ], [reBracket_$, ([, arbitrary]) => ({ flexGrow: arbitrary })]]),
};

export const h: CSSMap = {
  0: height0px,
  px: height1px,
  auto: heightAuto,
  full: height100pct,
  screen: height100vh,
  min: heightMinContent,
  max: heightMaxContent,
  fit: heightFitContent,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify)
            .match(
              matcher(["height"]),
            ),
      ],
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize)
            .match(matcher(["height"])),
      ],
      [reBracket_$, ([, body]) => ({ height: body })],
    ]),
};

export const indent: CSSMap = {
  0: textIndent0px,
  px: textIndent1px,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("text-indent")),
      ],
      [reBracket_$, ([, attr]) => ({ textIndent: attr })],
    ]),
};

export const inline: CSSMap = {
  "": displayInline,
  block: displayInlineBlock,
  flex: displayInlineFlex,
  table: displayInlineTable,
  grid: displayInlineGrid,
};
export const isolate = isolationIsolate;
export const isolation: CSSMap = { auto: isolationAuto };

export const items: CSSMap = {
  center: alignItemsCenter,
  start: alignItemsFlexStart,
  end: alignItemsFlexEnd,
  baseline: alignItemsBaseline,
  stretch: alignItemsStretch,
};
export const leading: CSSMap = {
  none: lineHeight1,
  tight: lineHeightTight,
  snug: lineHeightSnug,
  normal: lineHeightNormal,
  relaxed: lineHeightRelaxed,
  loose: lineHeightLoose,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, number]) =>
          parseNumeric(number).andThen(remify).match(matcher("line-height")),
      ],
      [reBracket_$, ([, attr]) => ({ lineHeight: attr })],
    ]),
};

export const left: CSSMap = {
  0: left0px,
  px: left1px,
  auto: leftAuto,
  full: left100pct,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher("left"),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("left")),
      ],
      [reBracket_$, ([, attr]) => ({ left: attr })],
    ]),
};

export const m: CSSMap = {
  0: margin0px,
  px: margin1px,
  auto: marginAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ margin: arbitrary })],
    ]),
};

export const mb: CSSMap = {
  0: marginBottom0px,
  px: marginBottom1px,
  auto: marginBottomAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-bottom")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginBottom: arbitrary }),
      ],
    ]),
};

export const mix: CSSMap = {
  blend: {
    normal: mixBlendModeNormal,
    multiply: mixBlendModeMultiply,
    screen: mixBlendModeScreen,
    overlay: mixBlendModeOverlay,
    darken: mixBlendModeDarken,
    lighten: mixBlendModeLighten,
    hue: mixBlendModeHue,
    saturation: mixBlendModeSaturation,
    luminosity: mixBlendModeLuminosity,
    difference: mixBlendModeDifference,
    exclusion: mixBlendModeExclusion,
    color: {
      "": mixBlendModeColor,
      dodge: mixBlendModeColorDodge,
      burn: mixBlendModeColorBurn,
    },
    hard: {
      light: mixBlendModeHardLight,
    },
    soft: {
      light: mixBlendModeSoftLight,
    },
  },
};

export const ml: CSSMap = {
  0: marginLeft0px,
  px: marginLeft1px,
  auto: marginLeftAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-left")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginLeft: arbitrary }),
      ],
    ]),
};

export const mr: CSSMap = {
  0: marginRight0px,
  px: marginRight1px,
  auto: marginRightAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-right")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginRight: arbitrary }),
      ],
    ]),
};

export const mt: CSSMap = {
  0: marginTop0px,
  px: marginTop1px,
  auto: marginTopAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-top")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginTop: arbitrary }),
      ],
    ]),
};

export const mx: CSSMap = {
  0: { ...marginLeft0px, ...marginRight0px },
  px: { ...marginLeft1px, ...marginRight1px },
  auto: { ...marginLeftAuto, ...marginRightAuto },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["margin-left", "margin-right"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["margin-left", "margin-right"], () => arbitrary),
      ],
    ]),
};

export const my: CSSMap = {
  0: { ...marginTop0px, ...marginBottom0px },
  px: { ...marginTop1px, ...marginBottom1px },
  auto: { ...marginTopAuto, ...marginBottomAuto },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["margin-top", "margin-bottom"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["margin-top", "margin-bottom"], () => arbitrary),
      ],
    ]),
};

export const opacity: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).andThen(per(100)).map(shortDecimal).match(
            matcher("opacity"),
          ),
      ],
    ]),
};

export const order: CSSMap = {
  first: orderFirst,
  last: orderLast,
  none: order0,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => parseNumeric(pNumber).match(matcher("order")),
      ],
      [reBracket_$, ([, order]) => ({ order })],
    ]),
};

export const p: CSSMap = {
  0: padding0px,
  px: padding1px,
  auto: paddingAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ padding: arbitrary })],
    ]),
};

export const pb: CSSMap = {
  0: paddingBottom0px,
  px: paddingBottom1px,
  auto: paddingBottomAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher("padding-bottom"),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingBottom: arbitrary }),
      ],
    ]),
};

export const pl: CSSMap = {
  0: paddingLeft0px,
  px: paddingLeft1px,
  auto: paddingLeftAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-left")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingLeft: arbitrary }),
      ],
    ]),
};

export const pr: CSSMap = {
  0: paddingRight0px,
  px: paddingRight1px,
  auto: paddingRightAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-right")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingRight: arbitrary }),
      ],
    ]),
};

export const pt: CSSMap = {
  0: paddingTop0px,
  px: paddingTop1px,
  auto: paddingTopAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-top")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingTop: arbitrary }),
      ],
    ]),
};

export const px: CSSMap = {
  0: { ...paddingLeft0px, ...paddingRight0px },
  px: { ...paddingLeft1px, ...paddingRight1px },
  auto: { ...paddingLeftAuto, ...paddingRightAuto },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["padding-left", "padding-right"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["padding-left", "padding-right"], () => arbitrary),
      ],
    ]),
};

export const py: CSSMap = {
  0: { ...paddingTop0px, ...paddingBottom0px },
  px: { ...paddingTop1px, ...paddingBottom1px },
  auto: { ...paddingTopAuto, ...paddingBottomAuto },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["padding-top", "padding-bottom"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["padding-top", "padding-bottom"], () => arbitrary),
      ],
    ]),
};

export const right: CSSMap = {
  0: right0px,
  px: right1px,
  auto: rightAuto,
  full: right100pct,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["right"]),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("right")),
      ],
      [
        reBracket_$,
        ([, attr]) => ({ right: attr }),
      ],
    ]),
};

export const shrink: CSSMap = {
  "": flexShrink1,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-shrink")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ flexShrink: arbitrary })],
    ]),
};

export const top: CSSMap = {
  0: top0px,
  px: top1px,
  auto: topAuto,
  full: top100pct,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["top"]),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("top")),
      ],
      [reBracket_$, ([, attr]) => ({ top: attr })],
    ]),
};

const LETTER_SPACING = "letterSpacing";
export const tracking: CSSMap = {
  tighter: letterSpacingTighter,
  tight: letterSpacingTight,
  normal: letterSpacingNormal,
  wide: letterSpacingWide,
  wider: letterSpacingWider,
  widest: letterSpacingWidest,
  "*": ({ id }) =>
    execMatch(id, [
      [reBracket_$, ([, attr]) => ({ [LETTER_SPACING]: attr })],
    ]),
};

export const w: CSSMap = {
  0: width0px,
  px: width1px,
  full: width100pec,
  auto: widthAuto,
  screen: width100vw,
  min: widthMinContent,
  max: widthMaxContent,
  fit: widthFitContent,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("width")),
      ],
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["width"]),
          ),
      ],
      [reBracket_$, ([, arbitrary]) => ({ width: arbitrary })],
    ]),
};

export const whitespace: CSSMap = {
  normal: whiteSpaceNormal,
  nowrap: whiteSpaceNowrap,
  pre: {
    "": whiteSpacePre,
    line: whiteSpacePreLine,
    wrap: whiteSpacePreWrap,
  },
};
export const z: CSSMap = {
  auto: zIndexAuto,
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, positiveNumber]) =>
          parseNumeric(positiveNumber).match(matcher("z-index")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ zIndex: arbitrary })],
    ]),
};

export const $static = positionStatic;
export const fixed = positionFixed;
export const absolute = positionAbsolute;
export const relative = positionRelative;
export const sticky = positionSticky;
export const visible = visibilityVisible;
export const invisible = visibilityHidden;
export const antialiased: DeclBlock = {
  ...WebkitFontSmoothingAntialiased,
  ...MozOsxFontSmoothingGrayscale,
};
export const subpixel: CSSMap = {
  antialiased: {
    ...WebkitFontSmoothingAuto,
    ...MozOsxFontSmoothingAuto,
  },
};
export const italic = fontStyleItalic;
export const contents = displayContents;
export const hidden = displayNone;
export const overline = textDecorationLineOverline;
export const line: CSSMap = {
  through: textDecorationLineLineThrough,
};

export const no: CSSMap = {
  underline: textDecorationLineNone,
};
export const sr: CSSMap = {
  only: {
    ...positionAbsolute,
    ...width1px,
    ...height1px,
    ...padding0,
    ...margin_1px,
    ...whiteSpaceNowrap,
    ...overflowHidden,
    clip: "rect(0, 0, 0, 0)",
    borderWidth: 0,
  },
};
export const ordinal = fontVariantNumericOrdinal;
export const slashed: CSSMap = {
  zero: fontVariantNumericSlashedZero,
};
export const lining: CSSMap = {
  nums: fontVariantNumericLiningNums,
};
export const oldstyle: CSSMap = {
  nums: fontVariantNumericOldstyleNums,
};
export const proportional: CSSMap = {
  nums: fontVariantNumericProportionalNums,
};

export const tabular: CSSMap = {
  nums: fontVariantNumericTabularNums,
};
export const diagonal: CSSMap = {
  fractions: fontVariantNumericDiagonalFractions,
};
export const stacked: CSSMap = {
  fractions: fontVariantNumericStackedFractions,
};
export const uppercase = textTransformUppercase;
export const lowercase = textTransformLowercase;
export const capitalize = textTransformCapitalize;
export const truncate: DeclBlock = {
  ...whiteSpaceNowrap,
  ...overflowHidden,
  textOverflow: "ellipsis",
};

export const brightness: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
            some: (value) =>
              handleSingleFilter("brightness", value, variablePrefix),
            none: undefined,
          }),
      ],
    ]),
};

export const contrast: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => handleFilter("contrast", pNumber, variablePrefix),
      ],
    ]),
};

function handleDrop(value: string, varPrefix: string): DeclBlock {
  return {
    [customProperty("drop-shadow", varPrefix)]: value,
    filter: filterValue(varPrefix),
  };
}

export const drop: CSSMap = {
  shadow: {
    "": (_, { variablePrefix }) =>
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
export const flow: CSSMap = {
  root: displayFlowRoot,
};

export const grayscale: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("grayscale", "100%", variablePrefix),
  0: (_, { variablePrefix }) =>
    handleSingleFilter("grayscale", 0, variablePrefix),
};

function handleSingleFilter(
  propertyName: string,
  value: string | number,
  varPrefix: string,
): DeclBlock {
  return {
    [customProperty(propertyName, varPrefix)]: `${propertyName}(${value})`,
    filter: filterValue(varPrefix),
  };
}

export const hue: CSSMap = {
  rotate: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) =>
                handleSingleFilter("hue-rotate", deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
};

export const invert: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("invert", "100%", variablePrefix),
  0: (_, { variablePrefix }) => handleSingleFilter("invert", 0, variablePrefix),
};

export const saturate: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
            some: (saturate) =>
              handleSingleFilter("saturate", saturate, variablePrefix),
            none: undefined,
          }),
      ],
    ]),
};

export const sepia: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("sepia", "100%", variablePrefix),
  0: (_, { variablePrefix }) => handleSingleFilter("sepia", 0, variablePrefix),
};

export const duration: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("ms")).match({
            some: (ms) => ({ transitionDuration: ms }),
            none: undefined,
          }),
      ],
    ]),
};

export const ease: CSSMap = {
  linear: transitionTimingFunctionLinear,
  in: {
    "": { transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)" },
    out: { transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  out: { transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
};

export const delay: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("ms")).match({
            some: (ms) => ({ transitionDelay: ms }),
            none: undefined,
          }),
      ],
    ]),
};

export const rotate: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("deg")).match({
            some: (deg) => ({
              [customProperty("rotate", variablePrefix)]: deg,
              transform: transformValue(variablePrefix),
            }),
            none: undefined,
          }),
      ],
    ]),
};

export const skew: CSSMap = {
  x: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) => handleTransform(["skew-x"], deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
  y: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) => handleTransform(["skew-y"], deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
};

export const origin: CSSMap = {
  center: transformOriginCenter,
  left: transformOriginLeft,
  right: transformOriginRight,
  top: {
    "": transformOriginTop,
    right: transformOriginTopRight,
    left: transformOriginTopLeft,
  },
  bottom: {
    "": transformOriginBottom,
    right: transformOriginBottomRight,
    left: transformOriginBottomLeft,
  },
};

function toAccentColor(color: string): { accentColor: string } {
  return { accentColor: color };
}

export const accent: CSSMap = {
  auto: accentColorAuto,
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toAccentColor,
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
            some: toAccentColor,
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
              some: toAccentColor,
              none: () => toAccentColor(color),
            });
        },
      ],
    ]),
};

export const appearance: CSSMap = {
  none: appearanceNone,
};

export const cursor: CSSMap = {
  auto: cursorAuto,
  default: cursorDefault,
  pointer: cursorPointer,
  wait: cursorWait,
  text: cursorText,
  move: cursorMove,
  help: cursorHelp,
  none: cursorNone,
  progress: cursorProgress,
  cell: cursorCell,
  crosshair: cursorCrosshair,
  vertical: {
    text: cursorVerticalText,
  },
  alias: cursorAlias,
  copy: cursorCopy,
  no: {
    drop: cursorNoDrop,
  },
  context: {
    menu: cursorContentMenu,
  },
  grab: cursorGrab,
  grabbing: cursorGrabbing,
  all: {
    scroll: cursorAllScroll,
  },
  col: {
    resize: cursorColResize,
  },
  row: {
    resize: cursorRowResize,
  },
  n: {
    resize: cursorNResize,
  },
  e: {
    resize: cursorEResize,
  },
  s: {
    resize: cursorSResize,
  },
  w: {
    resize: cursorWResize,
  },
  ne: {
    resize: cursorNeResize,
  },
  nw: {
    resize: cursorNwResize,
  },
  se: {
    resize: cursorSeResize,
  },
  sw: {
    resize: cursorSwResize,
  },
  ew: {
    resize: cursorEwResize,
  },
  ns: {
    resize: cursorNsResize,
  },
  nesw: {
    resize: cursorNeswResize,
  },
  nwse: {
    resize: cursorNwseResize,
  },
  zoom: {
    in: cursorZoomIn,
    out: cursorZoomOut,
  },
  not: {
    allowed: cursorNotAllowed,
  },
};
function toCaretColor(color: string) {
  return { caretColor: color };
}

export const caret: CSSMap = {
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toCaretColor,
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
            some: toCaretColor,
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
              some: toCaretColor,
              none: () => toCaretColor(color),
            });
        },
      ],
    ]),
};
export const pointer: CSSMap = {
  events: {
    none: { pointerEvents: "none" },
    auto: { pointerEvents: "auto" },
  },
};
export const resize: CSSMap = {
  "": { resize: "both" },
  none: { resize: "none" },
  x: { resize: "horizontal" },
  y: { resize: "vertical" },
};
export const touch: CSSMap = {
  auto: { touchAction: "auto" },
  none: { touchAction: "none" },
  manipulation: { touchAction: "manipulation" },
  pan: {
    x: { touchAction: "pan-x" },
    y: { touchAction: "pan-y" },
    left: { touchAction: "pan-left" },
    right: { touchAction: "pan-right" },
    up: { touchAction: "pan-up" },
    down: { touchAction: "pan-down" },
  },
  pinch: {
    zoom: { touchAction: "pinch-zoom" },
  },
};

export const select: CSSMap = {
  none: { userSelect: "none" },
  text: { userSelect: "text" },
  all: { userSelect: "all" },
  auto: { userSelect: "auto" },
};
export const will: CSSMap = {
  change: {
    auto: { willChange: "auto" },
    scroll: { willChange: "scroll-position" },
    contents: { willChange: "contents" },
    transform: { willChange: "transform" },
  },
};
function toFill(color: string) {
  return { fill: color };
}

export const fill: CSSMap = {
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toFill,
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
            some: toFill,
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
              some: toFill,
              none: () => toFill(color),
            });
        },
      ],
    ]),
};

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

export const from: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
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
};

export const via: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
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
};

export const to: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
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
};
