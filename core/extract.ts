import { isValidSelector } from "./utils/assert.ts";

/**
 * @see https://github.com/antfu/unocss/blob/main/packages/core/src/extractors/split.ts
 */
export const splitSimple = (code: string): string[] =>
  code.split(/[\s'"`;>=]+/g).filter(isValidSelector);

/** Extract tokens simply.
 * Extract per: `\s`, `"`, `'`, ```, `>`, `=`, `;`
 */
export function extractSimple(code: string): Set<string> {
  return new Set(splitSimple(code));
}
