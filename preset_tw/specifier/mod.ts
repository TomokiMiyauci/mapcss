import {
  $static,
  absolute,
  accent,
  align,
  antialiased,
  appearance,
  aspect,
  basis,
  block,
  bottom,
  brightness,
  capitalize,
  caret,
  clear,
  columns,
  container,
  contents,
  contrast,
  cursor,
  delay,
  diagonal,
  drop,
  duration,
  ease,
  fill,
  fixed,
  float,
  flow,
  from,
  grayscale,
  grow,
  h,
  hidden,
  hue,
  indent,
  inline,
  invert,
  invisible,
  isolate,
  isolation,
  italic,
  items,
  leading,
  left,
  line,
  lining,
  lowercase,
  m,
  mb,
  mix,
  ml,
  mr,
  mt,
  mx,
  my,
  no,
  oldstyle,
  opacity,
  order,
  ordinal,
  origin,
  overline,
  p,
  pb,
  pl,
  pointer,
  pr,
  proportional,
  pt,
  px,
  py,
  relative,
  resize,
  right,
  rotate,
  saturate,
  select,
  sepia,
  shrink,
  skew,
  slashed,
  sr,
  stacked,
  sticky,
  subpixel,
  tabular,
  to,
  top,
  touch,
  tracking,
  truncate,
  uppercase,
  via,
  visible,
  w,
  whitespace,
  will,
  z,
} from "./$single.ts";
import { normal } from "./normal.ts";
import { table } from "./table.ts";
import { $break } from "./break.ts";
import { box } from "./box.ts";
import { object } from "./object.ts";
import { overflow } from "./overflow.ts";
import { overscroll } from "./overscroll.ts";
import { inset } from "./inset.ts";
import { min } from "./min.ts";
import { max } from "./max.ts";
import { text } from "./text.ts";
import { not } from "./not.ts";
import { font } from "./font.ts";
import { bg } from "./bg.ts";
import { rounded } from "./rounded.ts";
import { border } from "./border.ts";
import { outline } from "./outline.ts";
import { grid } from "./grid.ts";
import { list } from "./list.ts";
import { justify } from "./justify.ts";
import { content } from "./content.ts";
import { flex } from "./flex.ts";
import { underline } from "./underline.ts";
import { col } from "./col.ts";
import { gap } from "./gap.ts";
import { auto } from "./auto.ts";
import { row } from "./row.ts";
import { divide } from "./divide.ts";
import { shadow } from "./shadow.ts";
import { space } from "./space.ts";
import { place } from "./place.ts";
import { decoration } from "./decoration.ts";
import { ring } from "./ring.ts";
import { blur } from "./blur.ts";
import { backdrop } from "./backdrop.ts";
import { transition } from "./transition.ts";
import { scale } from "./scale.ts";
import { translate } from "./translate.ts";
import { scroll } from "./scroll.ts";
import { snap } from "./snap.ts";
import { stroke } from "./stroke.ts";
import type { SpecifierMap } from "../../core/types.ts";

export const specifierMap: SpecifierMap = {
  container,
  flow,
  to,
  via,
  from,
  fill,
  caret,
  accent,
  stroke,
  snap,
  touch,
  select,
  will,
  scroll,
  resize,
  pointer,
  cursor,
  appearance,
  origin,
  skew,
  translate,
  rotate,
  scale,
  delay,
  ease,
  duration,
  transition,
  backdrop,
  sepia,
  saturate,
  invert,
  hue,
  grayscale,
  drop,
  contrast,
  brightness,
  blur,
  mix,
  ring,
  indent,
  truncate,
  capitalize,
  lowercase,
  uppercase,
  decoration,
  normal,
  ordinal,
  slashed,
  lining,
  oldstyle,
  proportional,
  tabular,
  diagonal,
  stacked,
  place,
  space,
  shadow,
  divide,
  row,
  auto,
  gap,
  col,
  order,
  shrink,
  grow,
  basis,
  sr,
  opacity,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mt,
  mr,
  mb,
  my,
  mx,
  top,
  right,
  bottom,
  flex,
  align,
  no,
  line,
  overline,
  underline,
  ml,
  items,
  m,
  justify,
  left,
  list,
  hidden,
  contents,
  grid,
  inline,
  aspect,
  outline,
  rounded,
  columns,
  block,
  break: $break,
  box,
  float,
  clear,
  table,
  border,
  isolation,
  inset,
  isolate,
  object,
  overflow,
  overscroll,
  static: $static,
  fixed,
  absolute,
  relative,
  tracking,
  sticky,
  visible,
  invisible,
  z,
  w,
  min,
  h,
  max,
  text,
  antialiased,
  subpixel,
  bg,
  italic,
  not,
  font,
  leading,
  content,
  whitespace,
};
