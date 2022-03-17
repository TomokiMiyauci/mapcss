import { extractBySpace } from "../core/extract.ts";
import type {
  MatchInfo,
  RuntimeContext,
  StaticContext,
} from "../core/types.ts";

export function createContext(
  context: Readonly<Partial<StaticContext & RuntimeContext>> = {},
): StaticContext & RuntimeContext {
  const defaultContext: StaticContext & RuntimeContext = {
    charMap: {},
    className: ".",
    mappedToken: "",
    token: "",
    separator: "-",
    theme: {},
    variablePrefix: "map-",
    minify: false,
    extract: extractBySpace,
  };
  return {
    ...defaultContext,
    ...context,
  };
}

export function createMatchInfo(
  matchInfo: Readonly<Partial<MatchInfo>> = {},
): MatchInfo {
  const defaultMatchInfo: MatchInfo = {
    id: "",
    parentId: undefined,
    path: [],
    fullPath: "",
  };
  return {
    ...defaultMatchInfo,
    ...matchInfo,
  };
}
