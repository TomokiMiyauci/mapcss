import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { numericBy } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const z: Mapper = [["auto", {
  "z-index": "auto",
}], [rePositiveNumber, ([, positiveNumber]) => {
  return numericBy(positiveNumber, (number) => ({
    "z-index": number,
  }));
}]];
