import { isValidSelector } from "./utils/assert.ts";

/**
 * @see https://github.com/antfu/unocss/blob/main/packages/core/src/extractors/split.ts
 */
export const splitCode = (code: string): string[] =>
  code.split(/[\s'"`;>=]+/g).filter(isValidSelector);

export function extractSplit(code: string): Set<string> {
  return new Set(splitCode(code));
}
