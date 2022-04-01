// This module is browser compatible.

import { cssFn, stringifyCustomProperty } from "../core/utils/format.ts";
import { chain, curry, svg2DataURL } from "./deps.ts";
import type { DynamicCSS } from "../core/types.ts";
import type { ColorMode, Option } from "./types.ts";

export function createCSSObject(
  svgMarkup: string,
  { declaration, colorMode }: Required<
    Option
  >,
): DynamicCSS {
  return (_, { variablePrefix }) => {
    const scale = "1";
    const data = JSON.stringify(svg2DataURL(svgMarkup));
    const $cssFn = curry(cssFn);
    const urlFn = $cssFn("url");
    const varFn = $cssFn("var");
    const url = chain(data).map(urlFn).unwrap();
    const varIcon = stringifyCustomProperty("icon", variablePrefix);
    const varFnIcon = varFn(varIcon);

    const mode: Exclude<ColorMode, "auto"> = colorMode === "auto"
      ? svgMarkup.includes("currentColor") ? "dynamic" : "static"
      : colorMode;

    const base = {
      [varIcon]: url,
      height: `${scale}em`,
      width: `${scale}em`,
      ...declaration,
    };
    const size = "100% 100%";
    const iconValue = `${varFnIcon} no-repeat`;

    if (mode === "dynamic") {
      return {
        mask: iconValue,
        maskSize: size,
        backgroundColor: "currentColor",
        ...base,
      };
    } else {
      return {
        background: iconValue,
        backgroundSize: size,
        backgroundColor: "transparent",
        ...base,
      };
    }
  };
}
