import { customProperty } from "../core/utils/format.ts";
import type { PostProcessor } from "../core/types.ts";

export const twCustomPropertyInjector: PostProcessor = {
  name: "tw-custom-property-injector",
  order: -1,
  fn: (cssStatement, { variablePrefix }) => {
    function customPropertyWith(property: string) {
      return customProperty(property, variablePrefix);
    }
    const varTranslateX = customPropertyWith("translate-x");
    const varTranslateY = customPropertyWith("translate-y");
    const varRotate = customPropertyWith("rotate");
    const varSkewX = customPropertyWith("skew-x");
    const varSkewY = customPropertyWith("skew-y");
    const varScaleX = customPropertyWith("scale-x");
    const varScaleY = customPropertyWith("scale-y");
    const varPanX = customPropertyWith("pan-x");
    const varPanY = customPropertyWith("pan-y");
    const varPinchZoom = customPropertyWith("pinch-zoom");
    const varScrollSnapStrictness = customPropertyWith(
      "scroll-snap-strictness",
    );
    const varOrdinal = customPropertyWith("ordinal");
    const varSlashedZero = customPropertyWith("slashed-zero");
    const varNumericFigure = customPropertyWith("numeric-figure");
    const varNumericSpacing = customPropertyWith("numeric-spacing");
    const varNumericFraction = customPropertyWith("numeric-fraction");
    const varRingInset = customPropertyWith("ring-inset");
    const varRingOffsetWidth = customPropertyWith("ring-offset-width");
    const varRingOffsetColor = customPropertyWith("ring-offset-color");
    const varRingColor = customPropertyWith("ring-color");
    const varRingOffsetShadow = customPropertyWith("ring-offset-shadow");
    const varRingShadow = customPropertyWith("ring-shadow");
    const varShadow = customPropertyWith("shadow");
    const varShadowColored = customPropertyWith("shadow-colored");
    const varBlur = customPropertyWith("blur");
    const varBrightness = customPropertyWith("brightness");
    const varContrast = customPropertyWith("contrast");
    const varGrayscale = customPropertyWith("grayscale");
    const varHueRotate = customPropertyWith("hue-rotate");
    const varInvert = customPropertyWith("invert");
    const varSaturate = customPropertyWith("saturate");
    const varSepia = customPropertyWith("sepia");
    const varDropShadow = customPropertyWith("drop-shadow");
    const varBackdropBlur = customPropertyWith("backdrop-blur");
    const varBackdropBrightness = customPropertyWith("backdrop-brightness");
    const varBackdropContrast = customPropertyWith("backdrop-contrast");
    const varBackdropGrayscale = customPropertyWith("backdrop-grayscale");
    const varBackdropHueRotate = customPropertyWith("backdrop-hue-rotate");
    const varBackdropInvert = customPropertyWith("backdrop-invert");
    const varBackdropOpacity = customPropertyWith("backdrop-opacity");
    const varBackdropSaturate = customPropertyWith("backdrop-saturate");
    const varBackdropSepia = customPropertyWith("backdrop-sepia");
    const declaration = {
      [varTranslateX]: 0,
      [varTranslateY]: 0,
      [varRotate]: 0,
      [varSkewX]: 0,
      [varSkewY]: 0,
      [varScaleX]: 1,
      [varScaleY]: 1,
      [varPanX]: " ",
      [varPanY]: " ",
      [varPinchZoom]: " ",
      [varScrollSnapStrictness]: "proximity",
      [varOrdinal]: " ",
      [varSlashedZero]: " ",
      [varNumericFigure]: " ",
      [varNumericSpacing]: " ",
      [varNumericFraction]: " ",
      [varRingInset]: " ",
      [varRingOffsetWidth]: "0px",
      [varRingOffsetColor]: "#fff",
      [varRingColor]: "rgb(59 130 246/.5)",
      [varRingOffsetShadow]: "0 0 #0000",
      [varRingShadow]: "0 0 #0000",
      [varShadow]: "0 0 #0000",
      [varShadowColored]: "0 0 #0000",
      [varBlur]: " ",
      [varBrightness]: " ",
      [varContrast]: " ",
      [varGrayscale]: " ",
      [varHueRotate]: " ",
      [varInvert]: " ",
      [varSaturate]: " ",
      [varSepia]: " ",
      [varDropShadow]: " ",
      [varBackdropBlur]: " ",
      [varBackdropBrightness]: " ",
      [varBackdropContrast]: " ",
      [varBackdropGrayscale]: " ",
      [varBackdropHueRotate]: " ",
      [varBackdropInvert]: " ",
      [varBackdropOpacity]: " ",
      [varBackdropSaturate]: " ",
      [varBackdropSepia]: " ",
    };

    cssStatement.unshift({
      "type": "ruleset",
      "order": -1,
      selector: "*, ::before, ::after",
      declaration,
    });

    return cssStatement;
  },
};
