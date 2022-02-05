import { reAll, reNumeric, reSlashNumber } from "../../core/utils/regexp.ts";
import { associatePx, associateRGBA } from "./_utils.ts";
import { isUndefined } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import type { Specifier } from "../../core/types.ts";

export const outline: Specifier = [
  ["DEFAULT", { "outline-style": "solid" }],
  ["none", { outline: "2px solid transparent", "outline-offset": "2px" }],
  ["dashed", { "outline-style": "dashed" }],
  ["dotted", { "outline-style": "dotted" }],
  ["double", { "outline-style": "double" }],
  ["hidden", { "outline-style": "hidden" }],
  ["offset", [[
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["outline-offset"]),
  ]]],

  [reNumeric, ([, numeric]) => associatePx(numeric, ["outline-width"])],
  [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["outline-color"], alpha);
  }],

  [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(color, ["outline-color"]);
  }],
];
