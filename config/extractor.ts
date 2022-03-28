// This module is browser compatible.

import { Extractor } from "./types.ts";
import { extractSimple } from "../core/extract.ts";

export const simpleExtractor: Extractor = {
  name: "@mapcss/simple-extractor",
  fn: extractSimple,
};
