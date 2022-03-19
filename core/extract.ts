import { isValidSelector } from "./utils/assert.ts";

/**
 * @see https://github.com/antfu/unocss/blob/main/packages/core/src/extractors/split.ts
 */
export const splitBySpace = (code: string): string[] =>
  code.split(/[\s'"`;>=]+/g).filter(isValidSelector);

export function extractBySpace(code: string): Set<string> {
  return new Set(splitBySpace(code));
}
