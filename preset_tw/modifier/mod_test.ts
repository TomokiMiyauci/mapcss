import { colorScheme } from "./color_scheme_test.ts";
import { expect, test } from "../../dev_deps.ts";
import { toAST } from "../../deps.ts";

import type {
  BinaryTree,
  ModifierContext,
  ModifierDefinition,
} from "../../core/types.ts";
export type TestCase = [
  BinaryTree<string | number>,
  BinaryTree<string | number>,
  ModifierDefinition,
  ModifierContext,
][];

export function createContext(
  context: Readonly<Partial<ModifierContext>>,
): ModifierContext {
  const defaultContext: ModifierContext = {
    modifier: "",
    charMap: {},
    className: ".",
    mappedToken: "",
    token: "",
    separator: "-",
    theme: {},
    variablePrefix: "map-",
    path: [],
  };
  return {
    ...defaultContext,
    ...context,
  };
}

test("modifier should return new root node", () => {
  const table: TestCase = [
    ...colorScheme,
  ];
  table.forEach(([css, result, modifier, context]) =>
    expect(modifier(toAST(css), context)).toEqualJSCSS(result)
  );
});
