import type { EntriesSpecifier } from "../../core/types.ts";

export const auto: EntriesSpecifier = [
  ["cols", {
    auto: { "grid-auto-columns": "auto" },
    min: { "grid-auto-columns": "min-content" },
    max: { "grid-auto-columns": "max-content" },
    fr: { "grid-auto-columns": "minmax(0, 1fr)" },
  }],
];
