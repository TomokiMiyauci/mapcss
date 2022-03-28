import type {
  CSS,
  MatchInfo,
  Modifier,
  RuntimeContext,
  StaticContext,
} from "../../core/types.ts";

export type TestCase = [
  CSS,
  CSS,
  Modifier,
  MatchInfo,
  StaticContext & RuntimeContext,
][];
