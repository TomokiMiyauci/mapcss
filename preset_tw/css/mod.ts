// This module is browser compatible.

import { DeclBlock } from "../../core/types.ts";

const VERTICAL_ALGIN = "verticalAlign";
const ASPECT_RATIO = "aspectRatio";
const FLEX_BASIS = "flexBasis";
const DISPLAY = "display";
const BOTTOM = "bottom";
const CLEAR = "clear";
const COLUMNS = "columns";
const FLOAT = "float";
const HEIGHT = "height";
const TEXT_INDENT = "textIndent";
const ISOLATION = "isolation";
const ALIGN_ITEMS = "alignItems";
const LINE_HEIGHT = "lineHeight";
const LEFT = "left";
const MIX_BLEND_MODE = "mixBlendMode";
const MARGIN = "margin";
const MARGIN_BOTTOM = `${MARGIN}Bottom` as const;
const MARGIN_LEFT = `${MARGIN}Left` as const;
const MARGIN_RIGHT = `${MARGIN}Right` as const;
const MARGIN_TOP = `${MARGIN}Top` as const;
const ORDER = "order";
const PADDING = "padding";
const PADDING_BOTTOM = "paddingBottom";
const PADDING_LEFT = "paddingLeft";
const PADDING_RIGHT = "paddingRight";
const PADDING_TOP = "paddingTop";
const RIGHT = "right";
const FLEX_SHRINK = "flexShrink";
const TOP = "top";
const LETTERS_PACING = "letterSpacing";
const WIDTH = "width";
const WHITESPACE = "whiteSpace";
const Z_INDEX = "zIndex";
const POSITION = "position";
const VISIBILITY = "visibility";
const WEBKIT_FONT_SMOOTHING = "WebkitFontSmoothing";
const MOZ_OSX_FONT_SMOOTHING = "MozOsxFontSmoothing";
const FONT_STYLE = "fontStyle";
const TEXT_DECORATION_LINE = "textDecorationLine";
const FONT_VARIANT_NUMERIC = "fontVariantNumeric";
const OVERFLOW = "overflow";
const ACCENT_COLOR = "accentColor";
const APPEARANCE = "appearance";
const CURSOR = "cursor";
const TRANSFORM_ORIGIN = "transformOrigin";
const POINTER_EVENTS = "pointerEvents";
const RESIZE = "resize";
const TOUCH_ACTION = "touchAction";
const USER_SELECT = "userSelect";
const WILL_CHANGE = "willChange";
const GRID_AUTO_COLUMNS = "gridAutoColumns";
const GRID_AUTO_ROWS = "gridAutoRows";
const ANIMATION = "animation";

export const gridAutoColumnsAuto: DeclBlock = { [GRID_AUTO_COLUMNS]: "auto" };
export const gridAutoColumnsMinContent: DeclBlock = {
  [GRID_AUTO_COLUMNS]: "min-content",
};
export const gridAutoColumnsMaxContent: DeclBlock = {
  [GRID_AUTO_COLUMNS]: "max-content",
};
export const gridAutoColumnsFr: DeclBlock = {
  [GRID_AUTO_COLUMNS]: "minmax(0, 1fr)",
};
export const gridAutoRowsAuto: DeclBlock = { [GRID_AUTO_ROWS]: "auto" };
export const gridAutoRowsMinContent: DeclBlock = {
  [GRID_AUTO_ROWS]: "min-content",
};
export const gridAutoRowsMaxContent: DeclBlock = {
  [GRID_AUTO_ROWS]: "max-content",
};
export const gridAutoRowsFr: DeclBlock = { [GRID_AUTO_ROWS]: "minmax(0, 1fr)" };
export const animationNone: DeclBlock = { [ANIMATION]: "none" };
export const verticalAlignBaseline: DeclBlock = {
  [VERTICAL_ALGIN]: "baseline",
};
export const verticalAlignTop: DeclBlock = { [VERTICAL_ALGIN]: "top" };
export const verticalAlignMiddle: DeclBlock = { [VERTICAL_ALGIN]: "middle" };
export const verticalAlignBottom: DeclBlock = { [VERTICAL_ALGIN]: "bottom" };
export const verticalAlignTextTop: DeclBlock = { [VERTICAL_ALGIN]: "text-top" };
export const verticalAlginTextBottom: DeclBlock = {
  [VERTICAL_ALGIN]: "text-bottom",
};
export const verticalAlginSub: DeclBlock = { [VERTICAL_ALGIN]: "sub" };
export const verticalAlginSuper: DeclBlock = { [VERTICAL_ALGIN]: "super" };
export const aspectRatioAuto: DeclBlock = { [ASPECT_RATIO]: "auto" };
export const aspectRatioSquare: DeclBlock = { [ASPECT_RATIO]: "1 / 1" };
export const aspectRatioVideo: DeclBlock = { [ASPECT_RATIO]: "16 / 9" };
export const flexBasis0px: DeclBlock = { [FLEX_BASIS]: "0px" };
export const flexBasis1Px: DeclBlock = { [FLEX_BASIS]: "1px" };
export const flexBasisAuto: DeclBlock = { [FLEX_BASIS]: "auto" };
export const flexBasis100Pct: DeclBlock = { [FLEX_BASIS]: "100%" };
export const displayBlock: DeclBlock = { [DISPLAY]: "block" };
export const displayContents: DeclBlock = { [DISPLAY]: "contents" };
export const displayNone: DeclBlock = { [DISPLAY]: "none" };
export const bottom0px: DeclBlock = { [BOTTOM]: "0px" };
export const bottom1px: DeclBlock = { [BOTTOM]: "1px" };
export const bottomAuto: DeclBlock = { [BOTTOM]: "auto" };
export const bottom100pct: DeclBlock = { [BOTTOM]: "100%" };
export const clearRight: DeclBlock = { [CLEAR]: "right" };
export const clearLeft: DeclBlock = { [CLEAR]: "left" };
export const clearBoth: DeclBlock = { [CLEAR]: "both" };
export const clearNone: DeclBlock = { [CLEAR]: "none" };
export const columnsAuto: DeclBlock = { [COLUMNS]: "auto" };
export const columns16rem: DeclBlock = { [COLUMNS]: "16rem" };
export const columns18rem: DeclBlock = { [COLUMNS]: "18rem" };
export const columns20rem: DeclBlock = { [COLUMNS]: "20rem" };
export const columns24rem: DeclBlock = { [COLUMNS]: "24rem" };
export const columns28rem: DeclBlock = { [COLUMNS]: "28rem" };
export const columns32rem: DeclBlock = { [COLUMNS]: "32rem" };
export const columns36rem: DeclBlock = { [COLUMNS]: "36rem" };
export const columns42rem: DeclBlock = { [COLUMNS]: "42rem" };
export const columns48rem: DeclBlock = { [COLUMNS]: "48rem" };
export const columns56rem: DeclBlock = { [COLUMNS]: "56rem" };
export const columns64rem: DeclBlock = { [COLUMNS]: "64rem" };
export const columns72rem: DeclBlock = { [COLUMNS]: "72rem" };
export const columns80rem: DeclBlock = { [COLUMNS]: "80rem" };
export const floatRight: DeclBlock = { [FLOAT]: "right" };
export const floatLeft: DeclBlock = { [FLOAT]: "left" };
export const floatNone: DeclBlock = { [FLOAT]: "none" };
export const height0px: DeclBlock = { [HEIGHT]: "0px" };
export const height1px: DeclBlock = { [HEIGHT]: "1px" };
export const heightAuto: DeclBlock = { [HEIGHT]: "auto" };
export const height100pct: DeclBlock = { [HEIGHT]: "100%" };
export const height100vh: DeclBlock = { [HEIGHT]: "100vh" };
export const heightMinContent: DeclBlock = { [HEIGHT]: "min-content" };
export const heightMaxContent: DeclBlock = { [HEIGHT]: "max-content" };
export const heightFitContent: DeclBlock = { [HEIGHT]: "fit-content" };
export const textIndent0px: DeclBlock = { [TEXT_INDENT]: "0px" };
export const textIndent1px: DeclBlock = { [TEXT_INDENT]: "1px" };
export const displayInline: DeclBlock = { [DISPLAY]: "inline" };
export const displayInlineBlock: DeclBlock = { [DISPLAY]: "inline-block" };
export const displayInlineFlex: DeclBlock = { [DISPLAY]: "inline-flex" };
export const displayInlineTable: DeclBlock = { [DISPLAY]: "inline-table" };
export const displayInlineGrid: DeclBlock = { [DISPLAY]: "inline-grid" };
export const displayFlowRoot: DeclBlock = { [DISPLAY]: "flow-root" };
export const isolationIsolate: DeclBlock = { [ISOLATION]: "isolate" };
export const isolationAuto: DeclBlock = { [ISOLATION]: "auto" };
export const alignItemsCenter: DeclBlock = { [ALIGN_ITEMS]: "center" };
export const alignItemsFlexStart: DeclBlock = { [ALIGN_ITEMS]: "flex-start" };
export const alignItemsFlexEnd: DeclBlock = { [ALIGN_ITEMS]: "flex-end" };
export const alignItemsBaseline: DeclBlock = { [ALIGN_ITEMS]: "baseline" };
export const alignItemsStretch: DeclBlock = { [ALIGN_ITEMS]: "stretch" };
export const lineHeight1: DeclBlock = { [LINE_HEIGHT]: 1 };
export const lineHeightTight: DeclBlock = { [LINE_HEIGHT]: 1.25 };
export const lineHeightSnug: DeclBlock = { [LINE_HEIGHT]: 1.375 };
export const lineHeightNormal: DeclBlock = { [LINE_HEIGHT]: 1.5 };
export const lineHeightRelaxed: DeclBlock = { [LINE_HEIGHT]: 1.625 };
export const lineHeightLoose: DeclBlock = { [LINE_HEIGHT]: 2 };
export const left0px: DeclBlock = { [LEFT]: "0px" };
export const left1px: DeclBlock = { [LEFT]: "1px" };
export const leftAuto: DeclBlock = { [LEFT]: "auto" };
export const left100pct: DeclBlock = { [LEFT]: "100%" };
export const margin0px: DeclBlock = { [MARGIN]: "0px" };
export const margin1px: DeclBlock = { [MARGIN]: "1px" };
export const margin_1px: DeclBlock = { [MARGIN]: "-1px" };

export const marginAuto: DeclBlock = { [MARGIN]: "auto" };
export const marginBottom0px: DeclBlock = { [MARGIN_BOTTOM]: "0px" };
export const marginBottom1px: DeclBlock = { [MARGIN_BOTTOM]: "1px" };
export const marginBottomAuto: DeclBlock = { [MARGIN_BOTTOM]: "auto" };
export const mixBlendModeNormal: DeclBlock = { [MIX_BLEND_MODE]: "normal" };
export const mixBlendModeMultiply: DeclBlock = { [MIX_BLEND_MODE]: "multiply" };
export const mixBlendModeScreen: DeclBlock = { [MIX_BLEND_MODE]: "screen" };
export const mixBlendModeOverlay: DeclBlock = { [MIX_BLEND_MODE]: "overlay" };
export const mixBlendModeDarken: DeclBlock = { [MIX_BLEND_MODE]: "darken" };
export const mixBlendModeLighten: DeclBlock = { [MIX_BLEND_MODE]: "lighten" };
export const mixBlendModeHue: DeclBlock = { [MIX_BLEND_MODE]: "hue" };
export const mixBlendModeSaturation: DeclBlock = {
  [MIX_BLEND_MODE]: "saturation",
};
export const mixBlendModeLuminosity: DeclBlock = {
  [MIX_BLEND_MODE]: "luminosity",
};
export const mixBlendModeDifference: DeclBlock = {
  [MIX_BLEND_MODE]: "difference",
};
export const mixBlendModeExclusion: DeclBlock = {
  [MIX_BLEND_MODE]: "exclusion",
};
export const mixBlendModeColor: DeclBlock = { [MIX_BLEND_MODE]: "color" };
export const mixBlendModeColorDodge: DeclBlock = {
  [MIX_BLEND_MODE]: "color-dodge",
};
export const mixBlendModeColorBurn: DeclBlock = {
  [MIX_BLEND_MODE]: "color-burn",
};
export const mixBlendModeHardLight: DeclBlock = {
  [MIX_BLEND_MODE]: "hard-light",
};
export const mixBlendModeSoftLight: DeclBlock = {
  [MIX_BLEND_MODE]: "soft-light",
};
export const marginLeft0px: DeclBlock = { [MARGIN_LEFT]: "0px" };
export const marginLeft1px: DeclBlock = { [MARGIN_LEFT]: "1px" };
export const marginLeftAuto: DeclBlock = { [MARGIN_LEFT]: "auto" };
export const marginRight0px: DeclBlock = { [MARGIN_RIGHT]: "0px" };
export const marginRight1px: DeclBlock = { [MARGIN_RIGHT]: "1px" };
export const marginRightAuto: DeclBlock = { [MARGIN_RIGHT]: "auto" };
export const marginTop0px: DeclBlock = { [MARGIN_TOP]: "0px" };
export const marginTop1px: DeclBlock = { [MARGIN_TOP]: "1px" };
export const marginTopAuto: DeclBlock = { [MARGIN_TOP]: "auto" };
export const orderFirst: DeclBlock = { [ORDER]: -9999 };
export const orderLast: DeclBlock = { [ORDER]: 9999 };
export const order0: DeclBlock = { [ORDER]: 0 };

export const padding0: DeclBlock = { [PADDING]: 0 };
export const padding0px: DeclBlock = { [PADDING]: "0px" };
export const padding1px: DeclBlock = { [PADDING]: "1px" };
export const paddingAuto: DeclBlock = { [PADDING]: "auto" };
export const paddingBottom0px: DeclBlock = { [PADDING_BOTTOM]: "0px" };
export const paddingBottom1px: DeclBlock = { [PADDING_BOTTOM]: "1px" };
export const paddingBottomAuto: DeclBlock = { [PADDING_BOTTOM]: "auto" };
export const paddingLeft0px: DeclBlock = { [PADDING_LEFT]: "0px" };
export const paddingLeft1px: DeclBlock = { [PADDING_LEFT]: "1px" };
export const paddingLeftAuto: DeclBlock = { [PADDING_LEFT]: "auto" };

export const paddingRight0px: DeclBlock = { [PADDING_RIGHT]: "0px" };
export const paddingRight1px: DeclBlock = { [PADDING_RIGHT]: "1px" };
export const paddingRightAuto: DeclBlock = { [PADDING_RIGHT]: "auto" };
export const paddingTop0px: DeclBlock = { [PADDING_TOP]: "0px" };
export const paddingTop1px: DeclBlock = { [PADDING_TOP]: "1px" };
export const paddingTopAuto: DeclBlock = { [PADDING_TOP]: "auto" };
export const right0px: DeclBlock = { [RIGHT]: "0px" };
export const right1px: DeclBlock = { [RIGHT]: "1px" };
export const rightAuto: DeclBlock = { [RIGHT]: "auto" };
export const right100pct: DeclBlock = { [RIGHT]: "100%" };

export const flexShrink1: DeclBlock = { [FLEX_SHRINK]: 1 };
export const top0px: DeclBlock = { [TOP]: "0px" };
export const top1px: DeclBlock = { [TOP]: "1px" };
export const topAuto: DeclBlock = { [TOP]: "auto" };
export const top100pct: DeclBlock = { [TOP]: "100%" };
export const letterSpacingTighter: DeclBlock = { [LETTERS_PACING]: "-0.05em" };
export const letterSpacingTight: DeclBlock = { [LETTERS_PACING]: "-0.025em" };
export const letterSpacingNormal: DeclBlock = { [LETTERS_PACING]: "0em" };
export const letterSpacingWide: DeclBlock = { [LETTERS_PACING]: "0.025em" };
export const letterSpacingWider: DeclBlock = { [LETTERS_PACING]: "0.05em" };
export const letterSpacingWidest: DeclBlock = { [LETTERS_PACING]: "0.1em" };

export const width0px: DeclBlock = { [WIDTH]: "0px" };
export const width1px: DeclBlock = { [WIDTH]: "1px" };
export const width100pec: DeclBlock = { [WIDTH]: "100%" };
export const widthAuto: DeclBlock = { [WIDTH]: "auto" };
export const width100vw: DeclBlock = { [WIDTH]: "100vw" };
export const widthMinContent: DeclBlock = { [WIDTH]: "min-content" };
export const widthMaxContent: DeclBlock = { [WIDTH]: "max-content" };
export const widthFitContent: DeclBlock = { [WIDTH]: "fit-content" };

export const whiteSpaceNormal: DeclBlock = { [WHITESPACE]: "normal" };
export const whiteSpaceNowrap: DeclBlock = { [WHITESPACE]: "nowrap" };
export const whiteSpacePre: DeclBlock = { [WHITESPACE]: "pre" };
export const whiteSpacePreLine: DeclBlock = { [WHITESPACE]: "pre-line" };
export const whiteSpacePreWrap: DeclBlock = { [WHITESPACE]: "pre-wrap" };
export const zIndexAuto: DeclBlock = { [Z_INDEX]: "auto" };
export const positionStatic: DeclBlock = { [POSITION]: "static" };
export const positionFixed: DeclBlock = { [POSITION]: "fixed" };
export const positionAbsolute: DeclBlock = { [POSITION]: "absolute" };
export const positionRelative: DeclBlock = { [POSITION]: "relative" };
export const positionSticky: DeclBlock = { [POSITION]: "sticky" };
export const visibilityVisible: DeclBlock = { [VISIBILITY]: "visible" };
export const visibilityHidden: DeclBlock = { [VISIBILITY]: "hidden" };

export const WebkitFontSmoothingAntialiased: DeclBlock = {
  [WEBKIT_FONT_SMOOTHING]: "antialiased",
};
export const WebkitFontSmoothingAuto: DeclBlock = {
  [WEBKIT_FONT_SMOOTHING]: "auto",
};

export const MozOsxFontSmoothingGrayscale: DeclBlock = {
  [MOZ_OSX_FONT_SMOOTHING]: "grayscale",
};
export const MozOsxFontSmoothingAuto: DeclBlock = {
  [MOZ_OSX_FONT_SMOOTHING]: "auto",
};

export const fontStyleItalic: DeclBlock = { [FONT_STYLE]: "italic" };
export const textDecorationLineOverline: DeclBlock = {
  [TEXT_DECORATION_LINE]: "overline",
};
export const textDecorationLineNone: DeclBlock = {
  [TEXT_DECORATION_LINE]: "none",
};
export const textDecorationLineLineThrough: DeclBlock = {
  [TEXT_DECORATION_LINE]: "line-through",
};
export const fontVariantNumericOrdinal: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "ordinal",
};
export const fontVariantNumericSlashedZero: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "slashed-zero",
};
export const fontVariantNumericLiningNums: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "lining-nums",
};
export const fontVariantNumericOldstyleNums: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "oldstyle-nums",
};
export const fontVariantNumericProportionalNums: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "proportional-nums",
};
export const fontVariantNumericTabularNums: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "tabular-nums",
};
export const fontVariantNumericDiagonalFractions: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "diagonal-fractions",
};
export const fontVariantNumericStackedFractions: DeclBlock = {
  [FONT_VARIANT_NUMERIC]: "stacked-fractions",
};
const TEXT_TRANSFORM = "textTransform";
export const textTransformUppercase: DeclBlock = {
  [TEXT_TRANSFORM]: "uppercase",
};
export const textTransformLowercase: DeclBlock = {
  [TEXT_TRANSFORM]: "lowercase",
};
export const textTransformCapitalize: DeclBlock = {
  [TEXT_TRANSFORM]: "capitalize",
};

export const overflowHidden: DeclBlock = { [OVERFLOW]: "hidden" };
export const transitionTimingFunctionLinear: DeclBlock = {
  transitionTimingFunction: "linear",
};

export const transformOriginCenter: DeclBlock = {
  [TRANSFORM_ORIGIN]: "center",
};
export const transformOriginLeft: DeclBlock = { [TRANSFORM_ORIGIN]: "left" };
export const transformOriginRight: DeclBlock = { [TRANSFORM_ORIGIN]: "right" };
export const transformOriginTop: DeclBlock = { [TRANSFORM_ORIGIN]: "top" };
export const transformOriginTopRight: DeclBlock = {
  [TRANSFORM_ORIGIN]: "top right",
};
export const transformOriginTopLeft: DeclBlock = {
  [TRANSFORM_ORIGIN]: "top left",
};
export const transformOriginBottom: DeclBlock = {
  [TRANSFORM_ORIGIN]: "bottom",
};
export const transformOriginBottomRight: DeclBlock = {
  [TRANSFORM_ORIGIN]: "bottom right",
};
export const transformOriginBottomLeft: DeclBlock = {
  [TRANSFORM_ORIGIN]: "bottom left",
};

export const accentColorAuto: DeclBlock = { [ACCENT_COLOR]: "auto" };
export const appearanceNone: DeclBlock = { [APPEARANCE]: "none" };
export const cursorAuto: DeclBlock = { [CURSOR]: "auto" };
export const cursorDefault: DeclBlock = { [CURSOR]: "default" };
export const cursorPointer: DeclBlock = { [CURSOR]: "pointer" };
export const cursorWait: DeclBlock = { [CURSOR]: "wait" };
export const cursorText: DeclBlock = { [CURSOR]: "text" };
export const cursorMove: DeclBlock = { [CURSOR]: "move" };
export const cursorHelp: DeclBlock = { [CURSOR]: "help" };
export const cursorNone: DeclBlock = { [CURSOR]: "none" };
export const cursorProgress: DeclBlock = { [CURSOR]: "progress" };
export const cursorCell: DeclBlock = { [CURSOR]: "cell" };
export const cursorCrosshair: DeclBlock = { [CURSOR]: "crosshair" };
export const cursorVerticalText: DeclBlock = { [CURSOR]: "vertical-text" };
export const cursorAlias: DeclBlock = { [CURSOR]: "alias" };
export const cursorCopy: DeclBlock = { [CURSOR]: "copy" };
export const cursorNoDrop: DeclBlock = { [CURSOR]: "no-drop" };
export const cursorContentMenu: DeclBlock = { [CURSOR]: "context-menu" };
export const cursorGrab: DeclBlock = { [CURSOR]: "grab" };
export const cursorGrabbing: DeclBlock = { [CURSOR]: "grabbing" };
export const cursorAllScroll: DeclBlock = { [CURSOR]: "all-scroll" };
export const cursorColResize: DeclBlock = { [CURSOR]: "col-resize" };
export const cursorRowResize: DeclBlock = { [CURSOR]: "row-resize" };
export const cursorNResize: DeclBlock = { [CURSOR]: "n-resize" };
export const cursorEResize: DeclBlock = { [CURSOR]: "e-resize" };
export const cursorSResize: DeclBlock = { [CURSOR]: "s-resize" };
export const cursorWResize: DeclBlock = { [CURSOR]: "w-resize" };
export const cursorNeResize: DeclBlock = { [CURSOR]: "ne-resize" };
export const cursorNwResize: DeclBlock = { [CURSOR]: "nw-resize" };
export const cursorSeResize: DeclBlock = { [CURSOR]: "se-resize" };
export const cursorSwResize: DeclBlock = { [CURSOR]: "sw-resize" };
export const cursorEwResize: DeclBlock = { [CURSOR]: "ew-resize" };
export const cursorNsResize: DeclBlock = { [CURSOR]: "ns-resize" };
export const cursorNeswResize: DeclBlock = { [CURSOR]: "nesw-resize" };
export const cursorNwseResize: DeclBlock = { [CURSOR]: "nwse-resize" };
export const cursorZoomIn: DeclBlock = { [CURSOR]: "zoom-in" };
export const cursorZoomOut: DeclBlock = { [CURSOR]: "zoom-out" };
export const cursorNotAllowed: DeclBlock = { [CURSOR]: "not-allowed" };
export const pointerEventsNone: DeclBlock = { [POINTER_EVENTS]: "none" };
export const pointerEventsAuto: DeclBlock = { [POINTER_EVENTS]: "auto" };
export const resizeBoth: DeclBlock = { [RESIZE]: "both" };
export const resizeNone: DeclBlock = { [RESIZE]: "none" };
export const resizeHorizontal: DeclBlock = { [RESIZE]: "horizontal" };
export const resizeVertical: DeclBlock = { [RESIZE]: "vertical" };
export const touchActionAuto: DeclBlock = { [TOUCH_ACTION]: "auto" };
export const touchActionNone: DeclBlock = { [TOUCH_ACTION]: "none" };
export const touchActionManipulation: DeclBlock = {
  [TOUCH_ACTION]: "manipulation",
};
export const touchActionPanX: DeclBlock = { [TOUCH_ACTION]: "pan-x" };
export const touchActionPanY: DeclBlock = { [TOUCH_ACTION]: "pan-y" };
export const touchActionPanLeft: DeclBlock = { [TOUCH_ACTION]: "pan-left" };
export const touchActionPanRight: DeclBlock = { [TOUCH_ACTION]: "pan-right" };
export const touchActionPanUp: DeclBlock = { [TOUCH_ACTION]: "pan-up" };
export const touchActionPanDown: DeclBlock = { [TOUCH_ACTION]: "pan-down" };
export const touchActionPinchZoom: DeclBlock = { [TOUCH_ACTION]: "pinch-zoom" };
export const userSelectNone: DeclBlock = { [USER_SELECT]: "none" };
export const userSelectText: DeclBlock = { [USER_SELECT]: "text" };
export const userSelectAll: DeclBlock = { [USER_SELECT]: "all" };
export const userSelectAuto: DeclBlock = { [USER_SELECT]: "auto" };
export const willChangeAuto: DeclBlock = { [WILL_CHANGE]: "auto" };
export const willChangeScrollPosition: DeclBlock = {
  [WILL_CHANGE]: "scroll-position",
};
export const willChangeContents: DeclBlock = { [WILL_CHANGE]: "contents" };
export const willChangeTransform: DeclBlock = { [WILL_CHANGE]: "transform" };
