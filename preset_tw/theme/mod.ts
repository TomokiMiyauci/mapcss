import { color } from "./color.ts";
import { fontSize } from "./font_size.ts";
import { fontWeight } from "./font_weight.ts";
import { letterSpacing } from "./letter_spacing.ts";
import { screen } from "./screen.ts";
import { fontFamily } from "./font_family.ts";
import { maxWidth } from "./max_width.ts";
import { margin } from "./margin.ts";
import { lineHeight } from "./line_height.ts";
import { column } from "./column.ts";
import { objectPosition } from "./object_position.ts";
import { defaultTheme } from "./default.ts";
import { width } from "./width.ts";

export const theme = {
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  screen,
  fontFamily,
  maxWidth,
  margin,
  padding: margin,
  lineHeight,
  column,
  objectPosition,
  default: defaultTheme,
  width,
};

export {
  color,
  column,
  defaultTheme,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  margin,
  maxWidth,
  objectPosition,
  screen,
  width,
};
