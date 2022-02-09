import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const stroke: EntriesSpecifier = [
  [rePositiveNumber, ([, pNumber]) =>
    parseNumeric(pNumber).match({
      some: (number) => ({ "stroke-width": number }),
      none: undefined,
    })],
];
