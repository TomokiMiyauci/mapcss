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

export const placeContent: Rule[] = [
  ["place-content-center", CENTER],
  ["place-content-start", START],
  ["place-content-end", END],
  ["place-content-between", `${SPACE}-${BETWEEN}`],
  ["place-content-around", `${SPACE}-${AROUND}`],
  ["place-content-evenly", `${SPACE}-${EVENLY}`],
  ["place-content-stretch", STRETCH],
];
