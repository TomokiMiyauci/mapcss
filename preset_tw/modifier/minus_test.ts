import { expect, toAST } from "../../dev_deps.ts";
import { $minus, reNumber, reUnitNumber } from "./minus.ts";
import { createContext, createMatchInfo } from "../../utils/context.ts";

const context = createContext();
const matchInfo = createMatchInfo();

Deno.test("$minus", () => {
  expect($minus(toAST({}), matchInfo, context)).toBe(undefined);
  expect($minus(toAST({ block: { display: "block" } }), matchInfo, context))
    .toBe(undefined);
  expect($minus(toAST({ "p-1": { padding: "1" } }), matchInfo, context))
    .toEqualJSCSS({ "p-1": { padding: "-1" } });
  expect($minus(toAST({ "p--1": { padding: "-1" } }), matchInfo, context))
    .toEqualJSCSS({ "p--1": { padding: "1" } });
  expect($minus(toAST({ "p--1": { padding: "+1" } }), matchInfo, context))
    .toEqualJSCSS({ "p--1": { padding: "-1" } });
  expect($minus(toAST({ "p-1px": { padding: "1px" } }), matchInfo, context))
    .toEqualJSCSS({ "p-1px": { padding: "-1px" } });
  expect($minus(toAST({ "p-1px": { padding: "-10.0vh" } }), matchInfo, context))
    .toEqualJSCSS({ "p-1px": { padding: "10vh" } });
  expect(
    $minus(
      toAST({ "p-1px": { padding: ".125rem", color: "red" } }),
      matchInfo,
      context,
    ),
  )
    .toEqualJSCSS({ "p-1px": { padding: "-0.125rem", color: "red" } });
  expect(
    $minus(
      toAST({ "p-1px": { display: "block", color: "red" } }),
      matchInfo,
      context,
    ),
  )
    .toBe(undefined);
});

Deno.test("reNumber", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["calc(100vh)", false],
    ["1", true],
    ["100", true],
    [".1", true],
    ["-1", true],
    ["+1", true],
    ["+01", true],
    ["+1e-10", true],
  ];

  table.forEach(([value, result]) => expect(reNumber.test(value)).toBe(result));
});

Deno.test("reUnitNumber", () => {
  const table: [string, boolean][] = [
    ["", false],
    ["calc(100vh)", false],
    ["1", false],
    ["100", false],
    [".1", false],
    ["-1", false],
    ["+1", false],
    ["+01", false],
    ["+1e-10", false],
    ["1px", true],
    ["1em", true],
    ["1rem", true],
    ["1pt", true],
    ["-1cap", true],
    ["1.25fr", true],
  ];

  table.forEach(([value, result]) =>
    expect(reUnitNumber.test(value)).toBe(result)
  );
});
