import type {
  BinaryTree,
  Modifier,
  ModifierContext,
} from "../../core/types.ts";

export type TestCase = [
  BinaryTree<string | number>,
  BinaryTree<string | number>,
  Modifier,
  ModifierContext,
][];

export function createContext(
  context: Readonly<Partial<ModifierContext>> = {},
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
