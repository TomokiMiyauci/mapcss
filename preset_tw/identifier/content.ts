import { reBracket_$ } from "../../core/utils/regexp.ts";
import { customPropertySet } from "./_utils.ts";
import type { EntriesIdentifier } from "../../core/types.ts";
export const content: EntriesIdentifier = [
  ["none", { content: "none" }],
  ["center", { "align-content": "center" }],
  ["start", { "align-content": "flex-start" }],
  ["end", { "align-content": "flex-end" }],
  ["between", { "align-content": "space-between" }],
  ["around", { "align-content": "space-around" }],
  ["evenly", { "align-content": "space-evenly" }],
  [reBracket_$, ([, body], { variablePrefix }) => {
    const [varContent, varFnContent] = customPropertySet(
      "content",
      variablePrefix,
    );
    return { [varContent]: body, content: varFnContent };
  }],
];
