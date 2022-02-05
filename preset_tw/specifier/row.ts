import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { associateNumeric, numericBy } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const row: Specifier = [
  ["auto", { "grid-row": "auto" }],
  ["span", [
    ["full", { "grid-row": "1/-1" }],
    [
      rePositiveNumber,
      ([, pNumber]) =>
        numericBy(
          pNumber,
          (number) => ({ "grid-row": `span ${number}/span ${number}` }),
        ),
    ],
  ]],
  ["start", [
    ["auto", { "grid-row-start": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => associateNumeric(["grid-row-start"], pNumber),
    ],
  ]],
  ["end", [
    ["auto", { "grid-row-end": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => associateNumeric(["grid-row-end"], pNumber),
    ],
  ]],
];
