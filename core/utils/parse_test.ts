import { hex2RGBA, RGBA } from "./parse.ts";
import { expect, test } from "../../dev_deps.ts";

test("hex2RGBA", () => {
  const table: [string, RGBA | undefined][] = [
    ["fff", {
      r: 255,
      g: 255,
      b: 255,
      a: undefined,
    }],
    ["#fff", {
      r: 255,
      g: 255,
      b: 255,
      a: undefined,
    }],
    ["#000", {
      r: 0,
      g: 0,
      b: 0,
      a: undefined,
    }],
    ["#ffffff02", {
      r: 255,
      g: 255,
      b: 255,
      a: 0.01,
    }],
  ];
  table.forEach(([color, result]) => expect(hex2RGBA(color)).toEqual(result));
});
