import { None, type Option, Some } from "../../deps.ts";

export function parseNumeric(value: string): Option<number> {
  const number = Number(value);
  if (Number.isFinite(number)) return Some(number);
  return None;
}
