import { generate } from "../../core/generate.ts";
import { cssMap } from "./mod.ts";
import { expect, test } from "../../dev_deps.ts";
import { box } from "./box_test.ts";

export type TestCase = [string, ReturnType<typeof generate>["js"]][];

export const table: TestCase = [
  ["", {}],
  ...box,
];

test("identifier mapping test", () => {
  table.forEach(([input, result]) =>
    expect(generate({ cssMap }, input).js).toEqual(result)
  );
});
