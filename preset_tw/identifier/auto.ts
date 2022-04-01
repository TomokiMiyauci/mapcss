// This module is browser compatible.

import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import {
  gridAutoColumnsAuto,
  gridAutoColumnsFr,
  gridAutoColumnsMaxContent,
  gridAutoColumnsMinContent,
  gridAutoRowsAuto,
  gridAutoRowsFr,
  gridAutoRowsMaxContent,
  gridAutoRowsMinContent,
} from "../css/mod.ts";
import type { CSSMap } from "../../core/types.ts";

export const auto: CSSMap = {
  cols: {
    auto: gridAutoColumnsAuto,
    min: gridAutoColumnsMinContent,
    max: gridAutoColumnsMaxContent,
    fr: gridAutoColumnsFr,
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ gridAutoColumns: arbitrary })],
      ]),
  },
  rows: {
    auto: gridAutoRowsAuto,
    min: gridAutoRowsMinContent,
    max: gridAutoRowsMaxContent,
    fr: gridAutoRowsFr,
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ gridAutoRows: arbitrary })],
      ]),
  },
};
