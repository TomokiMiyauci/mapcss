// This module is browser compatible.

const reValidSelector = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/;
export function isValidSelector(selector: string): selector is string {
  return reValidSelector.test(selector);
}

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
