import { colorScheme } from "./color_scheme_test.ts";
import { atRules } from "./at_rule_test.ts";
import { TestCase } from "./_test.ts";
import { pseudoElements } from "./pseudo_elements_test.ts";
import { expect, test } from "../../dev_deps.ts";
import { toAST } from "../deps.ts";

test("modifier should return new root node", () => {
  const table: TestCase = [
    ...colorScheme,
    ...pseudoElements,
    ...atRules,
  ];
  table.forEach(([css, result, modifier, matchInfo, context]) =>
    expect(modifier(toAST(css), matchInfo, context)).toEqualJSCSS(result)
  );
});
