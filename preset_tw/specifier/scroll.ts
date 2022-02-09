import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { filterValue, handleFilter } from "./_filter_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  RecordSpecifier,
  Specifier,
} from "../../core/types.ts";
import { handleTransform, transformValue } from "./_utils.ts";

export const scroll: EntriesSpecifier = [
  ["auto", { "scroll-behavior": "auto" }],
  ["smooth", { "scroll-behavior": "smooth" }],
];
