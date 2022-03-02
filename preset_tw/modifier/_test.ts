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
