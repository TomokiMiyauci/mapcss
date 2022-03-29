// This module is browser compatible.

const reValidSelector = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/;
const separator = `\\s'"\`;>=`;

export function isValidSelector(selector: string): selector is string {
  return reValidSelector.test(selector);
}

/**
 * @see https://github.com/antfu/unocss/blob/main/packages/core/src/extractors/split.ts
 */
export const splitSimple = (code: string): string[] =>
  code.split(new RegExp(`[${separator}]+`, "g")).filter(isValidSelector);

export const splitBracket = (code: string): string[] => {
  const re = new RegExp(
    `[${separator}]*([^${separator}]*?\\[.+?\\])[${separator}]+`,
    "g",
  );
  return code.split(re).filter(
    isValidSelector,
  );
};

/** Extract tokens simply.
 * Extract per: `\s`, `"`, `'`, ```, `>`, `=`, `;`
 */
export function extractSimple(code: string): Set<string> {
  return new Set(splitSimple(code));
}

/** Extract tokens with bracket.
 * The bracket and the characters within it or the bracket and the characters preceding it are taken as tokens.
 */
export function extractBracket(code: string): Set<string> {
  return new Set(splitBracket(code));
}
