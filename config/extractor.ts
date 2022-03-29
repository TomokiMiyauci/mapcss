// This module is browser compatible.

import { Extractor } from "./types.ts";
import { extractBracket, extractSimple } from "../core/extract.ts";

export const simpleExtractor: Extractor = {
  name: "@mapcss/simple-extractor",
  fn: extractSimple,
};

export const bracketExtractor: Extractor = {
  name: "@mapcss/bracket-extractor",
  fn: extractBracket,
};
