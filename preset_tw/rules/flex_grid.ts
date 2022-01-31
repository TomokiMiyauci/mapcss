import {
  AROUND,
  AUTO,
  BASELINE,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  NONE,
  SPACE,
  START,
  STRETCH,
} from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const FLEX = "flex";

export const flexes: Rule[] = [
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { [FLEX]: `1 1 ${AUTO}` }],
  ["flex-initial", { [FLEX]: `0 1 ${AUTO}` }],
  ["flex-none", { [FLEX]: NONE }],
];

const JUSTIFY_CONTENT = "justify-content";

export const justifyContents: Rule[] = [
  ["justify-start", { [JUSTIFY_CONTENT]: `${FLEX}-${START}` }],
  ["justify-end", { [JUSTIFY_CONTENT]: `${FLEX}-${END}` }],
  ["justify-center", { [JUSTIFY_CONTENT]: CENTER }],
  ["justify-between", { [JUSTIFY_CONTENT]: `${SPACE}-${BETWEEN}` }],
  ["justify-around", { [JUSTIFY_CONTENT]: `${SPACE}-${AROUND}` }],
  ["justify-evenly", { [JUSTIFY_CONTENT]: `${SPACE}-${EVENLY}` }],
];

const JUSTIFY_ITEMS = "justify-items";

export const justifyItems: Rule[] = [
  ["justify-items-start", { [JUSTIFY_ITEMS]: START }],
  ["justify-items-end", { [JUSTIFY_ITEMS]: END }],
  ["justify-items-center", { [JUSTIFY_ITEMS]: CENTER }],
  ["justify-items-stretch", { [JUSTIFY_ITEMS]: STRETCH }],
];

const JUSTIFY_SELF = "justify-self";

export const justifySelfs: Rule[] = [
  ["justify-self-auto", { [JUSTIFY_SELF]: AUTO }],
  ["justify-self-start", { [JUSTIFY_SELF]: START }],
  ["justify-self-end", { [JUSTIFY_SELF]: END }],
  ["justify-self-center", { [JUSTIFY_SELF]: CENTER }],
  ["justify-self-stretch", { [JUSTIFY_SELF]: STRETCH }],
];

const alignContent = "align-content";

export const alignContents: Rule[] = [
  ["content-center", { [alignContent]: CENTER }],
  ["content-start", { [alignContent]: `${FLEX}-${START}` }],
  ["content-end", { [alignContent]: `${FLEX}-${END}` }],
  ["content-between", { [alignContent]: `${SPACE}-${BETWEEN}` }],
  ["content-around", { [alignContent]: `${SPACE}-${AROUND}` }],
  ["content-evenly", { [alignContent]: `${SPACE}-${EVENLY}` }],
];

const ALIGN_ITEMS = "align-items";

export const alignItems: Rule[] = [
  ["items-start", { [ALIGN_ITEMS]: `${FLEX}-${START}` }],
  ["items-end", { [ALIGN_ITEMS]: `${FLEX}-${END}` }],
  ["items-center", { [ALIGN_ITEMS]: CENTER }],
  ["items-baseline", { [ALIGN_ITEMS]: "baseline" }],
  ["items-stretch", { [ALIGN_ITEMS]: "stretch" }],
];

const ALIGN_SELF = "align-self";

export const alignSelfs: Rule[] = [
  ["self-auto", { [ALIGN_SELF]: AUTO }],
  ["self-start", { [ALIGN_SELF]: `${FLEX}-${START}` }],
  ["self-end", { [ALIGN_SELF]: `${FLEX}-${END}` }],
  ["self-center", { [ALIGN_SELF]: CENTER }],
  ["self-stretch", { [ALIGN_SELF]: STRETCH }],
  ["self-baseline", { [ALIGN_SELF]: BASELINE }],
];
