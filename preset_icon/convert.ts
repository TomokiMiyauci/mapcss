import { IconifyJSON } from "https://esm.sh/@iconify/types/types.ts";

import { parseIconSet } from "https://esm.sh/@iconify/utils/lib/icon-set/parse?dts&pin=v66";
import { defaults } from "https://esm.sh/@iconify/utils/lib/customisations";
import { PresetOptions } from "./plugin.ts";
import { iconToSVG } from "https://esm.sh/@iconify/utils/lib/svg/build";

export function iconifyJSON(
  icon: IconifyJSON,
): PresetOptions["svgMap"] {
  const identifier: PresetOptions["svgMap"] = {};
  parseIconSet(icon, (name: string, iconData: string) => {
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
