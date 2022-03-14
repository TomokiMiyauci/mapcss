import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const font: CSSMap = {
  thin: { fontWeight: 100 },
  extralight: { fontWeight: 200 },
  light: { fontWeight: 300 },
  normal: { fontWeight: 400 },
  medium: { fontWeight: 500 },
  semibold: { fontWeight: 600 },
  bold: { fontWeight: 700 },
  extrabold: { fontWeight: 800 },
  black: { fontWeight: 900 },
  sans: {
    fontFamily:
      `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  serif: {
    fontFamily: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
  },
  mono: {
    fontFamily:
      `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ fontFamily: arbitrary })],
    ]),
};
