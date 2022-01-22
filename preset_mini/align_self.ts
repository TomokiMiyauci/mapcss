import {
  AUTO,
  BASELINE,
  CENTER,
  END,
  FLEX,
  START,
  STRETCH,
} from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const alignSelf: Rule[] = [
  ["self-auto", AUTO],
  ["self-start", `${FLEX}-${START}`],
  ["self-end", `${FLEX}-${END}`],
  ["self-center", CENTER],
  ["self-stretch", STRETCH],
  ["self-baseline", BASELINE],
];
