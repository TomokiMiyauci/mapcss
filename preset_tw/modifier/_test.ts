import type {
  BinaryTree,
  MatchInfo,
  Modifier,
  RuntimeContext,
  StaticContext,
} from "../../core/types.ts";

export type TestCase = [
  BinaryTree<string | number>,
  BinaryTree<string | number>,
  Modifier,
  MatchInfo,
  StaticContext & RuntimeContext,
][];
