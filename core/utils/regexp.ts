import { isUndefined } from "../../deps.ts";
import type { CSSObject } from "../types.ts";

export const re$Numeric = /^([\d.]+)$/;
export const re$PositiveNumberPer$PositiveNumber = /^(\d+)\/(\d+)$/;
export const re$PositiveNumber = /^(\d+)$/;
export const re$All = /^(.+)$/;
export const re$AllPer$PositiveNumber = /^(.+)\/(\d+)$/;
export const reBracket_$ = /^\[(.+)\]$/;
export const re$AllPerBracket_$ = /^(.+)\/\[(.+)\]$/;

export function execMatch(
  value: string,
  matchEntries: [
    RegExp,
    (regExpExecArray: RegExpExecArray) => CSSObject | undefined,
  ][],
): CSSObject | undefined {
  for (const [regExp, fn] of matchEntries) {
    const regExpExecArray = regExp.exec(value);
    if (regExpExecArray) {
      const result = fn(regExpExecArray);
      if (isUndefined(result)) continue;
      return result;
    }
  }
}
