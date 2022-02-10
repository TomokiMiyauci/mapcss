import { None, type Option, Some } from "../../deps.ts";
import { hex2RGBA, type RGBA } from "./parse.ts";

export function parseNumeric(value: string): Option<number> {
  const number = Number(value);
  if (Number.isFinite(number)) return Some(number);
  return None;
}

export function parseFraction(
  numerator: string,
  denominator: string,
): Option<number> {
  const result = Number(numerator) / Number(denominator);
  if (Number.isFinite(result)) return Some(result);
  return None;
}

export function parseColor(value: string): Option<RGBA> {
  const maybeRGBA = hex2RGBA(value);
  if (maybeRGBA) return Some(maybeRGBA);
  return None;
}
