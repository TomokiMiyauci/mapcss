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
