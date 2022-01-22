import {
  AROUND,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  FLEX,
  SPACE,
  START,
} from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const alignContent: Rule[] = [
  ["content-center", CENTER],
  ["content-start", `${FLEX}-${START}`],
  ["content-end", `${FLEX}-${END}`],
  ["content-between", `${SPACE}-${BETWEEN}`],
  ["content-around", `${SPACE}-${AROUND}`],
  ["content-evenly", `${SPACE}-${EVENLY}`],
];
