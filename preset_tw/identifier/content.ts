import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import { customPropertySet } from "./_utils.ts";
import type { CSSMap } from "../../core/types.ts";

export const content: CSSMap = {
  none: { content: "none" },
  center: { alignContent: "center" },
  start: { alignContent: "flex-start" },
  end: { alignContent: "flex-end" },
  between: { alignContent: "space-between" },
  around: { alignContent: "space-around" },
  evenly: { alignContent: "space-evenly" },
  "*": (match, { variablePrefix }) =>
    execMatch(match, [
      [reBracket_$, ([, body]) => {
        const [varContent, varFnContent] = customPropertySet(
          "content",
          variablePrefix,
        );
        return { [varContent]: body, content: varFnContent };
      }],
    ]),
};
