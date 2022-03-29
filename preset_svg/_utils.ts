// This module is browser compatible.

/** Safe encode svg tag for BaseURI
 * @see https://bl.ocks.org/jennyknuth/222825e315d45a738ed9d6e04c7a88d0#encodeSvg.js
 */
export function encodeSvg(value: string): string {
  return value.replace(
    "<svg",
    ~value.indexOf("xmlns")
      ? "<svg"
      : '<svg xmlns="http://www.w3.org/2000/svg"',
  )
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}
