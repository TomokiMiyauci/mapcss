import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { associateNumeric, numericBy } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const col: Specifier = [
  ["auto", { "grid-column": "auto" }],
  ["span", [
    ["full", { "grid-column": "1/-1" }],
    [
      rePositiveNumber,
      ([, pNumber]) =>
        numericBy(
          pNumber,
          (number) => ({ "grid-column": `span ${number}/span ${number}` }),
        ),
    ],
  ]],
  ["start", [
    ["auto", { "grid-column-start": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => associateNumeric(["grid-column-start"], pNumber),
    ],
  ]],
  ["end", [
    ["auto", { "grid-column-end": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => associateNumeric(["grid-column-end"], pNumber),
    ],
  ]],
];
