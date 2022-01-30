import { color } from "./color.ts";
import { fontSize } from "./font_size.ts";
import { fontWeight } from "./font_weight.ts";
import { screen } from "./screen.ts";
import { fontFamily } from "./font_family.ts";
import { margin } from "./margin.ts";
import { lineHeight } from "./line_height.ts";
import { column } from "./column.ts";
import { objectPosition } from "./object_position.ts";
import { width } from "./width.ts";
import { minWidth } from "./min_width.ts";
import { height, maxWidth } from "./sizing.ts";
import { borderRadius, borderWidth } from "./border.ts";

export const theme = {
  color,
  fontSize,
  fontWeight,
  screen,
  fontFamily,
  maxWidth,
  margin,
  padding: margin,
  lineHeight,
  column,
  height,
  objectPosition,
  width,
  minWidth,
  borderWidth,
  borderRadius,
};

export {
  borderRadius,
  borderWidth,
  color,
  column,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  lineHeight,
  margin,
  maxWidth,
  minWidth,
  objectPosition,
  screen,
  width,
};
