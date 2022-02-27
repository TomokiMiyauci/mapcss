import { re$Numeric, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher, remify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { EntriesIdentifier } from "../../core/types.ts";

export const gap: EntriesIdentifier = [
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
    [reBracket_$, ([, arbitrary]) => ({ "column-gap": arbitrary })],
  ]],
  ["y", [
    [0, { "row-gap": "0px" }],
    ["px", { "row-gap": "1px" }],
    [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher("row-gap")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "row-gap": arbitrary })],
  ]],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("gap")),
  ],
  [reBracket_$, ([, gap]) => ({ gap })],
];
