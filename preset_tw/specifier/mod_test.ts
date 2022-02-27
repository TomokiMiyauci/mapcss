import { generate } from "../../core/generate.ts";
import { specifierMap } from "./mod.ts";
import { expect, test } from "../../dev_deps.ts";
import { box } from "./box_test.ts";

export type TestCase = [string, ReturnType<typeof generate>["js"]][];

export const table: TestCase = [
  ["", {}],
  ...box,
];

test("specifier mapping test", () => {
  table.forEach(([input, result]) =>
    expect(generate({ specifierMap }, input).js).toEqual(result)
  );
});
