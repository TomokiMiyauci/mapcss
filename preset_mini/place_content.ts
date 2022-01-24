import {
  AROUND,
  BETWEEN,
  CENTER,
  END,
  EVENLY,
  SPACE,
  START,
  STRETCH,
} from "../constants.ts";
import type { Rule } from "../core/types.ts";

const PLACE_CONTENT = "place-content";

export const placeContents: Rule[] = [
  ["place-content-center", { [PLACE_CONTENT]: CENTER }],
  ["place-content-start", { [PLACE_CONTENT]: START }],
  ["place-content-end", { [PLACE_CONTENT]: END }],
  ["place-content-between", { [PLACE_CONTENT]: `${SPACE}-${BETWEEN}` }],
  ["place-content-around", { [PLACE_CONTENT]: `${SPACE}-${AROUND}` }],
  ["place-content-evenly", { [PLACE_CONTENT]: `${SPACE}-${EVENLY}` }],
  ["place-content-stretch", { [PLACE_CONTENT]: STRETCH }],
];
