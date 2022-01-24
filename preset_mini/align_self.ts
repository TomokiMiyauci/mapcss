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

const ALIGN_SELF = "align-self";

export const alignSelfs: Rule[] = [
  ["self-auto", { [ALIGN_SELF]: AUTO }],
  ["self-start", { [ALIGN_SELF]: `${FLEX}-${START}` }],
  ["self-end", { [ALIGN_SELF]: `${FLEX}-${END}` }],
  ["self-center", { [ALIGN_SELF]: CENTER }],
  ["self-stretch", { [ALIGN_SELF]: STRETCH }],
  ["self-baseline", { [ALIGN_SELF]: BASELINE }],
];
