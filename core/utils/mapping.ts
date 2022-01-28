import { BOTTOM, LEFT, RIGHT, TOP } from "../../constants.ts";
import type { Axis, Corner, Dir } from "./types.ts";

export const direction4Map: Record<Dir, string> = {
  t: TOP,
  r: RIGHT,
  b: BOTTOM,
  l: LEFT,
};

export const axisMap: Record<Axis, string[]> = {
  x: [LEFT, RIGHT],
  y: [TOP, BOTTOM],
};

export const cornerMap: Record<Corner, string[]> = {
  t: [`${TOP}-${LEFT}`, `${TOP}-${RIGHT}`],
  r: [`${TOP}-${RIGHT}`, `${BOTTOM}-${RIGHT}`],
  b: [`${BOTTOM}-${RIGHT}`, `${BOTTOM}-${LEFT}`],
  l: [`${TOP}-${LEFT}`, `${BOTTOM}-${LEFT}`],
  tl: [`${TOP}-${LEFT}`],
  tr: [`${TOP}-${RIGHT}`],
  br: [`${BOTTOM}-${RIGHT}`],
  bl: [`${BOTTOM}-${LEFT}`],
};
