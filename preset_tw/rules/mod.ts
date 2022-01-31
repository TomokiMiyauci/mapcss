import { backfaceVisibilities } from "./backface_visibility.ts";
import { fontStyles } from "./font_style.ts";
import { justifyContents } from "./justify_content.ts";
import { justifyItems } from "./justify_items.ts";
import { justifySelfs } from "./justify_self.ts";
import { placeContents } from "./place_content.ts";
import { pointerEvents } from "./pointer_events.ts";
import { resizes } from "./resize.ts";
import { textDecorations } from "./text_decoration.ts";
import { textDecorationLines } from "./text_decoration_line.ts";
import { textOverflows } from "./text_overflow.ts";
import { textTransforms } from "./text_transform.ts";
import { userSelects } from "./user_select.ts";
import { fontSizes } from "./font_size.ts";
import { fontWeights } from "./font_weight.ts";
import { fontFamilies } from "./font_family.ts";
import { maxWidths } from "./max_width.ts";
import {
  colors,
  contents,
  fontSmoothings,
  letterSpacings,
  lineHeights,
  textAligns,
  verticalAligns,
  whiteSpaces,
  wordBreaks,
} from "./typography.ts";
import {
  aspectRatios,
  boxDecorations,
  boxSizings,
  breakAfter,
  breakBefore,
  breakInsides,
  clears,
  columns,
  displays,
  floats,
  insets,
  isolations,
  objectFits,
  objectPositions,
  overflows,
  overscrollBehaviors,
  positions,
  visibilities,
  zIndexes,
} from "./layout.ts";
import { margins, paddings } from "./spacing.ts";
import { heights, maxHeights, minWidths, widths } from "./sizing.ts";
import {
  borderColors,
  borderRadiuses,
  borderStyles,
  borderWidths,
  outlineColors,
  outlineOffsets,
  outlineStyles,
  outlineWidths,
} from "./border.ts";
import { backgroundColors } from "./background.ts";
import { borderCollapses } from "./table.ts";
import { alignContents, alignItems, alignSelfs, flexes } from "./flex_grid.ts";

export const nestedRules = [
  alignContents,
  alignItems,
  alignSelfs,
  aspectRatios,
  backfaceVisibilities,
  colors,
  clears,
  contents,
  displays,
  flexes,
  floats,
  fontStyles,
  justifyContents,
  justifyItems,
  justifySelfs,
  placeContents,
  pointerEvents,
  positions,
  resizes,
  insets,
  textAligns,
  textDecorations,
  textDecorationLines,
  textOverflows,
  textTransforms,
  userSelects,
  visibilities,
  wordBreaks,
  zIndexes,
  backgroundColors,
  fontSizes,
  fontWeights,
  letterSpacings,
  fontFamilies,
  maxWidths,
  margins,
  maxHeights,
  outlineStyles,
  lineHeights,
  columns,
  breakBefore,
  breakAfter,
  breakInsides,
  boxDecorations,
  boxSizings,
  paddings,
  isolations,
  objectFits,
  objectPositions,
  overflows,
  overscrollBehaviors,
  widths,
  minWidths,
  heights,
  borderWidths,
  borderColors,
  borderRadiuses,
  borderStyles,
  outlineWidths,
  outlineOffsets,
  outlineColors,
  whiteSpaces,
  verticalAligns,
  fontSmoothings,
  borderCollapses,
];

export {
  alignContents,
  alignItems,
  alignSelfs,
  aspectRatios,
  backfaceVisibilities,
  backgroundColors,
  borderCollapses,
  borderColors,
  borderRadiuses,
  borderStyles,
  borderWidths,
  boxDecorations,
  boxSizings,
  breakAfter,
  breakBefore,
  breakInsides,
  clears,
  colors,
  columns,
  contents,
  displays,
  flexes,
  floats,
  fontFamilies,
  fontSizes,
  fontSmoothings,
  fontStyles,
  fontWeights,
  heights,
  insets,
  isolations,
  justifyContents,
  justifyItems,
  justifySelfs,
  letterSpacings,
  lineHeights,
  margins,
  maxHeights,
  maxWidths,
  minWidths,
  objectFits,
  objectPositions,
  outlineColors,
  outlineOffsets,
  outlineStyles,
  outlineWidths,
  overflows,
  overscrollBehaviors,
  paddings,
  placeContents,
  pointerEvents,
  positions,
  resizes,
  textAligns,
  textDecorationLines,
  textDecorations,
  textOverflows,
  textTransforms,
  userSelects,
  verticalAligns,
  visibilities,
  whiteSpaces,
  widths,
  wordBreaks,
  zIndexes,
};
