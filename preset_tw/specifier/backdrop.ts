import { customPropertySet } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { ratio, shortDecimal, unit } from "../../core/utils/format.ts";
import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { customProperty } from "../../core/utils/format.ts";
import type { CSSObject, EntriesSpecifier } from "../../core/types.ts";

const BACKDROP_BLUR = "backdrop-blur";

function backdropFilterValue(varPrefix: string): string {
  const [, varFnBackdropBlur] = customPropertySet("backdrop-blur", varPrefix);
  const [, varFnBackdropBrightness] = customPropertySet(
    "backdrop-brightness",
    varPrefix,
  );
  const [, varFnBackdropContrast] = customPropertySet(
    "backdrop-contrast",
    varPrefix,
  );
  const [, varFnBackdropGrayscale] = customPropertySet(
    "backdrop-grayscale",
    varPrefix,
  );
  const [, varFnBackdropHueRotate] = customPropertySet(
    "backdrop-hue-rotate",
    varPrefix,
  );
  const [, varFnBackdropInvert] = customPropertySet(
    "backdrop-invert",
    varPrefix,
  );
  const [, varFnBackdropOpacity] = customPropertySet(
    "backdrop-opacity",
    varPrefix,
  );
  const [, varFnBackdropSaturate] = customPropertySet(
    "backdrop-saturate",
    varPrefix,
  );
  const [, varFnBackdropSepia] = customPropertySet("backdrop-sepia", varPrefix);

  return `${varFnBackdropBlur} ${varFnBackdropBrightness} ${varFnBackdropContrast} ${varFnBackdropGrayscale} ${varFnBackdropHueRotate} ${varFnBackdropInvert} ${varFnBackdropOpacity} ${varFnBackdropSaturate} ${varFnBackdropSepia}`;
}

function handleFilter(
  property: string,
  value: string | number,
  varPrefix: string,
): CSSObject {
  return {
    [customProperty(property, varPrefix)]: value,
    "backdrop-filter": backdropFilterValue(varPrefix),
  };
}

export const backdrop: EntriesSpecifier = [
  ["blur", [
    [
      "DEFAULT",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(8px)", variablePrefix),
    ],
    [
      "none",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(0)", variablePrefix),
    ],
    [
      "sm",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(4px)", variablePrefix),
    ],
    [
      "md",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(12px)", variablePrefix),
    ],
    [
      "lg",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(16px)", variablePrefix),
    ],
    [
      "xl",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(24px)", variablePrefix),
    ],
    [
      "2xl",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(40px)", variablePrefix),
    ],
    [
      "3xl",
      (_, { variablePrefix }) =>
        handleFilter(BACKDROP_BLUR, "blur(64px)", variablePrefix),
    ],
  ]],
  ["brightness", [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
          some: (v) =>
            handleFilter(
              "backdrop-brightness",
              `brightness(${v})`,
              variablePrefix,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["contrast", [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
          some: (v) =>
            handleFilter(
              "backdrop-contrast",
              `contrast(${v})`,
              variablePrefix,
            ),
          none: undefined,
        }),
    ],
  ]],
  ["grayscale", [
    [
      "DEFAULT",
      (_, { variablePrefix }) =>
        handleFilter("backdrop-grayscale", "grayscale(100%)", variablePrefix),
    ],
    [
      0,
      (_, { variablePrefix }) =>
        handleFilter("backdrop-grayscale", "grayscale(0)", variablePrefix),
    ],
  ]],
  ["hue", {
    rotate: [
      [
        rePositiveNumber,
        ([, pNumber], { variablePrefix }) =>
          parseNumeric(pNumber).map(unit("deg")).match({
            some: (deg) =>
              handleFilter(
                "backdrop-hue-rotate",
                `hue-rotate(${deg})`,
                variablePrefix,
              ),
            none: undefined,
          }),
      ],
    ],
  }],
  ["invert", [
    [
      "DEFAULT",
      (_, { variablePrefix }) =>
        handleFilter("backdrop-invert", "invert(100%)", variablePrefix),
    ],
    [
      0,
      (_, { variablePrefix }) =>
        handleFilter("backdrop-invert", "invert(0)", variablePrefix),
    ],
  ]],
  ["opacity", [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
          some: (v) =>
            handleFilter(
              "backdrop-opacity",
              `opacity(${v})`,
              variablePrefix,
            ),
          none: undefined,
        }),
    ],
  ]],
];
