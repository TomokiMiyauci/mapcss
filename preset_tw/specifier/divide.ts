import type { EntriesSpecifier } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";
export const divide: EntriesSpecifier = [
  ["solid", [{ "border-style": "solid" }, combinator]],
  ["dashed", [{ "border-style": "dashed" }, combinator]],
  ["dotted", [{ "border-style": "dotted" }, combinator]],
  ["double", [{ "border-style": "double" }, combinator]],
  ["none", [{ "border-style": "none" }, combinator]],
];
