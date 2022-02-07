import { reNumeric } from "../../core/utils/regexp.ts";
import { associatePx } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const underline: Specifier = {
  DEFAULT: { "text-decoration-line": "underline" },
  offset: [
    ["auto", { "text-underline-offset": "auto" }],
    [
      reNumeric,
      ([, numeric]) => associatePx(numeric, ["text-underline-offset"]),
    ],
  ],
};
