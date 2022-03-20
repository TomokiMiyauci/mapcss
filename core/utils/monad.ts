import { None, Option, Some } from "../deps.ts";
import { hex2RGBA, RGBA } from "./parse.ts";

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

export function divide(a: number, b: number): Option<number> {
  const result = a / b;
  if (Number.isFinite(result)) return Some(result);
  return None;
}

export function per(b: number): (a: number) => Option<number> {
  return (a: number) => divide(a, b);
}
