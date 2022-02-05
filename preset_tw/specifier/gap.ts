import { reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const gap: EntriesSpecifier = [
  [0, { gap: "0px" }],
  ["px", { gap: "1px" }],
  ["x", [
    [0, { "column-gap": "0px" }],
    ["px", { "column-gap": "1px" }],
    [reNumeric, ([, numeric]) => associateRem(["column-gap"], numeric)],
  ]],
  ["y", [
    [0, { "row-gap": "0px" }],
    ["px", { "row-gap": "1px" }],
    [reNumeric, ([, numeric]) => associateRem(["row-gap"], numeric)],
  ]],
  [reNumeric, ([, numeric]) => associateRem(["gap"], numeric)],
];
