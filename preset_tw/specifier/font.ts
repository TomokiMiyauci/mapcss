import type { Specifier } from "../../core/types.ts";

export const font: Specifier = {
  thin: { "font-weight": 100 },
  extralight: { "font-weight": 200 },
  light: { "font-weight": 300 },
  normal: { "font-weight": 400 },
  medium: { "font-weight": 500 },
  semibold: { "font-weight": 600 },
  bold: { "font-weight": 700 },
  extrabold: { "font-weight": 800 },
  black: { "font-weight": 900 },
  sans: {
    "font-family":
      `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  serif: {
    "font-family":
      `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
  },
  mono: {
    "font-family":
      `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
};
