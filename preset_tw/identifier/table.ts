import type { RecordIdentifier } from "../../core/types.ts";

export const table: RecordIdentifier = {
  DEFAULT: { display: "table" },
  caption: { display: "table-caption" },
  cell: { display: "table-cell" },
  column: {
    DEFAULT: { display: "table-column" },
    group: { display: "table-column-group" },
  },
  header: { group: { display: "table-header-group" } },
  footer: { group: { display: "table-footer-group" } },
  row: {
    DEFAULT: { display: "table-row" },
    group: { display: "table-row-group" },
  },
  auto: { "table-layout": "auto" },
  fixed: { "table-layout": "fixed" },
};
