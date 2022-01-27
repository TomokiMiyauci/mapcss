/** Escape special char */
export function escapeRegExp(value: string) {
  return value.replaceAll(/\//g, "\\$&");
}
