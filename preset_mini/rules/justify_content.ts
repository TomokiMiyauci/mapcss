import {
  AROUND,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  SPACE,
  START,
} from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const JUSTIFY_CONTENT = "justify-content";

export const justifyContents: Rule[] = [
  ["justify-start", { [JUSTIFY_CONTENT]: START }],
  ["justify-end", { [JUSTIFY_CONTENT]: END }],
  ["justify-center", { [JUSTIFY_CONTENT]: CENTER }],
  ["justify-between", { [JUSTIFY_CONTENT]: `${SPACE}-${BETWEEN}` }],
  ["justify-around", { [JUSTIFY_CONTENT]: `${SPACE}-${AROUND}` }],
  ["justify-evenly", { [JUSTIFY_CONTENT]: `${SPACE}-${EVENLY}` }],
];
