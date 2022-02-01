import { parseNumeric } from "../../core/utils/parse.ts";
import { isNumber } from "../../deps.ts";
import { rePositiveNumber } from "../../core/utils/regexp.ts";
import type { EntriesMapper } from "../../core/types.ts";

export const columns: EntriesMapper = [
  ["auto", { columns: "auto" }],
  ["3xs", { columns: "16rem" }],
  ["2xs", { columns: "18rem" }],
  ["xs", { columns: "20rem" }],
  ["sm", { columns: "24rem" }],
  ["md", { columns: "28rem" }],
  ["lg", { columns: "32rem" }],
  ["xl", { columns: "36rem" }],
  ["2xl", { columns: "42rem" }],
  ["3xl", { columns: "48rem" }],
  ["4xl", { columns: "56rem" }],
  ["5xl", { columns: "64rem" }],
  ["6xl", { columns: "72rem" }],
  ["7xl", { columns: "80rem" }],
  [rePositiveNumber, ([, n]) => {
    const number = parseNumeric(n);
    if (isNumber(number)) {
      return {
        columns: number,
      };
    }
  }],
];
