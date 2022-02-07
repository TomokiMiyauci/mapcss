import { backface } from "./backface.ts";
import {
  $static,
  absolute,
  antialiased,
  block,
  capitalize,
  contents,
  diagonal,
  fixed,
  hidden,
  invisible,
  isolate,
  isolation,
  italic,
  line,
  lining,
  lowercase,
  no,
  oldstyle,
  ordinal,
  overline,
  proportional,
  relative,
  slashed,
  sr,
  stacked,
  sticky,
  subpixel,
  tabular,
  truncate,
  uppercase,
  visible,
} from "./single.ts";
import { normal } from "./normal.ts";
import { align } from "./align.ts";
import { table } from "./table.ts";
import { columns } from "./columns.ts";
import { $break } from "./break.ts";
import { box } from "./box.ts";
import { float } from "./float.ts";
import { clear } from "./clear.ts";
import { object } from "./object.ts";
import { overflow } from "./overflow.ts";
import { overscroll } from "./overscroll.ts";
import { inset } from "./inset.ts";
import { z } from "./z.ts";
import { w } from "./w.ts";
import { min } from "./min.ts";
import { max } from "./max.ts";
import { h } from "./h.ts";
import { text } from "./text.ts";
import { not } from "./not.ts";
import { font } from "./font.ts";
import { tracking } from "./tracking.ts";
import { leading } from "./leading.ts";
import { whitespace } from "./whitespace.ts";
import { bg } from "./bg.ts";
import { rounded } from "./rounded.ts";
import { border } from "./border.ts";
import { outline } from "./outline.ts";
import { aspect } from "./aspect.ts";
import { inline } from "./inline.ts";
import { grid } from "./grid.ts";
import { list } from "./list.ts";
import { left } from "./left.ts";
import { justify } from "./justify.ts";
import { content } from "./content.ts";
import { items } from "./items.ts";
import { m } from "./m.ts";
import { mx } from "./mx.ts";
import { my } from "./my.ts";
import { mt } from "./mt.ts";
import { mr } from "./mr.ts";
import { mb } from "./mb.ts";
import { ml } from "./ml.ts";
import { p } from "./p.ts";
import { px } from "./px.ts";
import { py } from "./py.ts";
import { pt } from "./pt.ts";
import { pr } from "./pr.ts";
import { pb } from "./pb.ts";
import { pl } from "./pl.ts";
import { flex } from "./flex.ts";
import { underline } from "./underline.ts";
import { top } from "./top.ts";
import { right } from "./right.ts";
import { bottom } from "./bottom.ts";
import { opacity } from "./opacity.ts";
import { basis } from "./basis.ts";
import { grow } from "./grow.ts";
import { shrink } from "./shrink.ts";
import { order } from "./order.ts";
import { col } from "./col.ts";
import { gap } from "./gap.ts";
import { auto } from "./auto.ts";
import { row } from "./row.ts";
import { divide } from "./divide.ts";
import { shadow } from "./shadow.ts";
import { space } from "./space.ts";
import { place } from "./place.ts";
import { decoration } from "./decoration.ts";
import { indent } from "./indent.ts";
import { ring } from "./ring.ts";
import { mix } from "./mix.ts";

export const specifierMap = {
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
  backface,
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
