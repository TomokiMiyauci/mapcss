import {
  AROUND,
  AUTO,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  NONE,
  SPACE,
  START,
} from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const FLEX = "flex";

export const flexes: Rule[] = [
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { [FLEX]: `1 1 ${AUTO}` }],
  ["flex-initial", { [FLEX]: `0 1 ${AUTO}` }],
  ["flex-none", { [FLEX]: NONE }],
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