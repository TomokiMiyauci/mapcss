// This module is browser compatible.

import { defaults, IconifyJSON, iconToSVG, parseIconSet } from "./deps.ts";
import type { SVGMap } from "./types.ts";

export function iconifyJSON(
  icon: IconifyJSON,
): SVGMap {
  const identifier: SVGMap = {};
  parseIconSet(icon, (name: any, iconData: any) => {
    if (!iconData) {
      throw Error(iconData);
    }
    const renderData = iconToSVG(iconData, defaults);
    const svgAttributes: Record<string, string> = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      ...renderData.attributes,
    };
    const svgAttributesStr = Object.keys(svgAttributes)
      .map(
        (attr) =>
          `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`,
      )
      .join(" ");

    const svg = `<svg ${svgAttributesStr}>${renderData.body}</svg>`;
    identifier[name] = svg;
  });
  return identifier;
}
