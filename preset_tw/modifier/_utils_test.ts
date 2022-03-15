import { selectorTransform } from "./_utils.ts";
import { expect, test } from "../../dev_deps.ts";
import { toAST } from "../../deps.ts";
import { createContext, createMatchInfo } from "../../utils/context.ts";
import type {
  BinaryTree,
  MatchInfo,
  RuntimeContext,
  StaticContext,
} from "../../core/types.ts";

const context = createContext();
const matchInfo = createMatchInfo();
const block = { display: "block" };

test("selectorTransform", () => {
  const table: [
    BinaryTree<string | number>,
    ...Parameters<typeof selectorTransform>,
    BinaryTree<string | number>,
    MatchInfo,
    StaticContext & RuntimeContext,
  ][] = [
    [{}, (selector) => selector, {}, matchInfo, context],
    [
      { block },
      (selector) => `${selector}:hover`,
      { "block:hover": block },
      matchInfo,
      context,
    ],
    [
      { block },
      (selector) => `${selector}::before`,
      { "block::before": block },
      matchInfo,
      context,
    ],
    [
      { block },
      (selector) => `[dir="ltr"] ${selector}`,
      { [`[dir="ltr"] block`]: block },
      matchInfo,
      context,
    ],
    [
      { "@media print": { block } },
      (selector) => `[dir="ltr"] ${selector}`,
      { "@media print": { [`[dir="ltr"] block`]: block } },
      matchInfo,
      context,
    ],
    [
      {
        "@keyframe test": {
          to: {
            color: "red",
          },
        },
      },
      (selector) => `[dir="ltr"] ${selector}`,
      {
        "@keyframe test": {
          to: {
            color: "red",
          },
        },
      },
      matchInfo,
      context,
    ],
  ];

  table.forEach(([css, transform, result, matchInfo, context]) =>
    expect(selectorTransform(transform)(toAST(css), matchInfo, context))
      .toEqualJSCSS(
        result,
      )
  );
});
