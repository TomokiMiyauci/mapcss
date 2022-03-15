import { execMatch, re$Numeric, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher, pxify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const underline: CSSMap = {
  "": { textDecorationLine: "underline" },
  offset: {
    auto: { textUnderlineOffset: "auto" },
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(
              matcher("text-underline-offset"),
            ),
        ],
        [reBracket_$, ([, attr]) => ({ textUnderlineOffset: attr })],
      ]),
  },
};
