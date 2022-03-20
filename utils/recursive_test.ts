import { expect, type ParamReturn, test } from "../dev_deps.ts";
import { recTransform } from "./recursive.ts";

test("recTransform", () => {
  const fn = () => "";
  const table: ParamReturn<typeof recTransform>[] = [
    [{}, fn, {}],
    [{ a: false }, fn, { a: "" }],
    [{ a: false, b: { c: false } }, fn, {
      a: "",
      b: { c: "" },
    }],
    [{ a: false, b: { c: false, d: "d", e: { f: "f" } } }, () => 1, {
      a: 1,
      b: {
        c: 1,
        d: 1,
        e: {
          f: 1,
        },
      },
    }],
  ];
  table.forEach(([object, fn, result]) =>
    expect(recTransform(object, fn)).toEqual(result)
  );
});
