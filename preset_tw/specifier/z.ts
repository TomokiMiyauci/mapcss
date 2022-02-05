import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { numericBy } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const z: Specifier = [["auto", {
  "z-index": "auto",
}], [rePositiveNumber, ([, positiveNumber]) => {
  return numericBy(positiveNumber, (number) => ({
    "z-index": number,
  }));
}]];
