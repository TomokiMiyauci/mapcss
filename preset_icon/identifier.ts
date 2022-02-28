import { encodeSvg } from "./_utils.ts";
import { cssFn } from "../core/utils/format.ts";
import { chain, curry } from "../deps.ts";
import { stringifyCustomProperty } from "../core/utils/format.ts";
import type { IdentifierHandler } from "../core/types.ts";

export function createCSSObject(svgMarkup: string): IdentifierHandler {
  return (_, { variablePrefix }) => {
    const scale = "1";
    const data = `"data:image/svg+xml;utf8,${encodeSvg(svgMarkup)}"`;

    const $cssFn = curry(cssFn);
    const urlFn = $cssFn("url");
    const varFn = $cssFn("var");
    const url = chain(data).map(urlFn).unwrap();
    const varIcon = stringifyCustomProperty("icon", variablePrefix);
    const varFnIcon = varFn(varIcon);

    const mask = `${varFnIcon} no-repeat`;
    const maskSize = "100% 100%";

    return {
      [varIcon]: url,
      mask,
      "-webkit-mask": mask,
      maskSize,
      "-webkit-mask-size": maskSize,
      backgroundColor: "currentColor",
      height: `${scale}em`,
      width: `${scale}em`,
    };
  };
}
