/** Escape special char
 * @see https://www.w3.org/TR/CSS21/syndata.html#:~:text=In%20CSS%2C%20identifiers%20(including%20element,hyphen%20followed%20by%20a%20digit.
 */
export function escapeRegExp(value: string): string {
  return value.replaceAll(
    /[^a-zA-Z\d-_]/g,
    "\\$&",
  );
}
