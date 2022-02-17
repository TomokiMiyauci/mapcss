/** Escape special char */
export function escapeRegExp(value: string): string {
  return value.replaceAll(/[\/\[\]\.\(\),%:!]/g, "\\$&");
}
