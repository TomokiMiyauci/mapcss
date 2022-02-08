import { shortDecimal } from "./format.ts";
import { expect, test } from "../../dev_deps.ts";

test("shortDecimal", () => {
  expect(shortDecimal("0.01")).toBe(".01");
  expect(shortDecimal("1")).toBe("1");
  expect(shortDecimal("0.5")).toBe(".5");
  expect(shortDecimal("1.05")).toBe("1.05");
  expect(shortDecimal("10.01")).toBe("10.01");
});
