import { reNumeric } from "../../core/utils/regexp.ts";
import { matcher, pxify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Specifier } from "../../core/types.ts";

export const underline: Specifier = {
  DEFAULT: { "text-decoration-line": "underline" },
  offset: [
    ["auto", { "text-underline-offset": "auto" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).map(pxify).match(
          matcher("text-underline-offset"),
        ),
    ],
  ],
};
