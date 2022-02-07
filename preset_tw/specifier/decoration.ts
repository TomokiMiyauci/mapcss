import { reNumeric } from "../../core/utils/regexp.ts";
import { associatePx } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const decoration: EntriesSpecifier = [
  ["solid", { "text-decoration-style": "solid" }],
  ["double", { "text-decoration-style": "double" }],
  ["dotted", { "text-decoration-style": "dotted" }],
  ["dashed", { "text-decoration-style": "dashed" }],
  ["wavy", { "text-decoration-style": "wavy" }],
  ["auto", { "text-decoration-thickness": "auto" }],
  ["from", {
    "font": { "text-decoration-thickness": "from-font" },
  }],
  [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["text-decoration-thickness"]),
  ],
];
