import {
  AROUND,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  FLEX,
  SPACE,
  START,
} from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const alignContent = "align-content";

export const alignContents: Rule[] = [
  ["content-center", { [alignContent]: CENTER }],
  ["content-start", { [alignContent]: `${FLEX}-${START}` }],
  ["content-end", { [alignContent]: `${FLEX}-${END}` }],
  ["content-between", { [alignContent]: `${SPACE}-${BETWEEN}` }],
  ["content-around", { [alignContent]: `${SPACE}-${AROUND}` }],
  ["content-evenly", { [alignContent]: `${SPACE}-${EVENLY}` }],
];
