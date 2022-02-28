import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { EntriesIdentifier } from "../../core/types.ts";

export const auto: EntriesIdentifier = [
  ["cols", [
    ["auto", { "grid-auto-columns": "auto" }],
    ["min", { "grid-auto-columns": "min-content" }],
    ["max", { "grid-auto-columns": "max-content" }],
    ["fr", { "grid-auto-columns": "minmax(0, 1fr)" }],
    [reBracket_$, ([, arbitrary]) => ({ "grid-auto-columns": arbitrary })],
  ]],
  ["rows", [
    ["auto", { "grid-auto-rows": "auto" }],
    ["min", { "grid-auto-rows": "min-content" }],
    ["max", { "grid-auto-rows": "max-content" }],
    ["fr", { "grid-auto-rows": "minmax(0, 1fr)" }],
    [reBracket_$, ([, arbitrary]) => ({ "grid-auto-rows": arbitrary })],
  ]],
];