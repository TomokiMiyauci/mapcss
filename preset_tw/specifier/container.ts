import type { EntriesSpecifier } from "../../core/types.ts";

export const container: EntriesSpecifier = [
  ["DEFAULT", [{ "cssObject": { width: "100%" } }, {
    atRules: ["@media (min-width: 640px)"],
    cssObject: {
      "max-width": "640px",
    },
  }, {
    atRules: ["@media (min-width: 720px)"],
    cssObject: {
      "max-width": "720px",
    },
  }, {
    atRules: ["@media (min-width: 1024px)"],
    cssObject: {
      "max-width": "1024px",
    },
  }, {
    atRules: ["@media (min-width: 1280px)"],
    cssObject: {
      "max-width": "1280px",
    },
  }, {
    atRules: ["@media (min-width: 1536px)"],
    cssObject: {
      "max-width": "1536px",
    },
  }]],
];
