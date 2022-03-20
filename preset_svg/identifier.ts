import { encodeSvg } from "./_utils.ts";
import { cssFn } from "../core/utils/format.ts";
import { chain, curry } from "../deps.ts";
import { stringifyCustomProperty } from "../core/utils/format.ts";
import type { DynamicCSS } from "../core/types.ts";

export function createCSSObject(
  svgMarkup: string,
  { declaration }: { declaration: Record<string, string | number> },
): DynamicCSS {
  return (_, { variablePrefix }) => {
    const scale = "1";
    const data = `"data:image/svg+xml;utf8,${encodeSvg(svgMarkup)}"`;

    const $cssFn = curry(cssFn);
    const urlFn = $cssFn("url");
    const varFn = $cssFn("var");
    const url = chain(data).map(urlFn).unwrap();
    const varIcon = stringifyCustomProperty("icon", variablePrefix);
    const varFnIcon = varFn(varIcon);

    const mode = svgMarkup.includes("currentColor") ? "mask" : "bg";

    const base = {
      [varIcon]: url,
      height: `${scale}em`,
      width: `${scale}em`,
      ...declaration,
    };
    const size = "100% 100%";
    const iconValue = `${varFnIcon} no-repeat`;

    if (mode === "mask") {
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
