import { backface } from "./backface_visibility.ts";
import {
  $static,
  absolute,
  antialiased,
  block,
  contents,
  fixed,
  hidden,
  invisible,
  isolate,
  isolation,
  italic,
  line,
  no,
  overline,
  relative,
  sticky,
  subpixel,
  visible,
} from "./single.ts";
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
import { ml } from "./ml.ts";
import { flex } from "./flex.ts";
import { underline } from "./underline.ts";
import { top } from "./top.ts";
import { right } from "./right.ts";
import { bottom } from "./bottom.ts";

export const mapperMap = {
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
