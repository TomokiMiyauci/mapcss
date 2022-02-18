import { re$Numeric } from "../../core/utils/regexp.ts";
import { matcher, remify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const gap: EntriesSpecifier = [
  [0, { gap: "0px" }],
  ["px", { gap: "1px" }],
  ["x", [
    [0, { "column-gap": "0px" }],
    ["px", { "column-gap": "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher("column-gap")),
    ],
  ]],
  ["y", [
    [0, { "row-gap": "0px" }],
    ["px", { "row-gap": "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher("row-gap")),
    ],
  ]],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("gap")),
  ],
];
