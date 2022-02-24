export {
  any,
  anyArray,
  anyBoolean,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";

export type ParamReturn<T extends (...args: any[]) => unknown> = [
  ...Parameters<T>,
  ReturnType<T>,
];
