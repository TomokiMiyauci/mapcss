// This module is browser compatible.
import { Extractor } from "./types.ts";
import { Arrayable, distinctBy, wrap } from "./deps.ts";
import { extractBracket, extractSimple } from "../core/extract.ts";

export const simpleExtractor: Extractor = {
  name: "@mapcss/simple-extractor",
  fn: extractSimple,
};

export const bracketExtractor: Extractor = {
  name: "@mapcss/bracket-extractor",
  fn: extractBracket,
};

export function applyExtractor(
  input: string,
  extractor: Arrayable<Extractor>,
): Set<string> {
  const extracts = distinctBy(wrap(extractor), ({ name }) => name).map((
    { fn },
  ) => fn);

  return extracts.reduce((acc, extract) => {
    const result = extract(input);

    result.forEach((token) => {
      acc.add(token);
    });

    return acc;
  }, new Set<string>());
}
