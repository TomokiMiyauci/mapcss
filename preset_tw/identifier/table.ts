import type { CSSMap } from "../../core/types.ts";

export const table: CSSMap = {
  "": { display: "table" },
  caption: { display: "table-caption" },
  cell: { display: "table-cell" },
  column: {
    "": { display: "table-column" },
    group: { display: "table-column-group" },
  },
  header: { group: { display: "table-header-group" } },
  footer: { group: { display: "table-footer-group" } },
  row: {
    "": { display: "table-row" },
    group: { display: "table-row-group" },
  },
  auto: { tableLayout: "auto" },
  fixed: { tableLayout: "fixed" },
};
