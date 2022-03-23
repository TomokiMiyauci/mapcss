import { Extractor } from "./types.ts";
import { extractSimple } from "../core/mod.ts";

export const SimpleExtractor: Extractor = {
  name: "@mapcss/simple-extractor",
  fn: extractSimple,
};
