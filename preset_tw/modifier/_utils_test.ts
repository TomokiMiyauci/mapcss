import { selectorTransform } from "./_utils.ts";
import { expect, test } from "../../dev_deps.ts";
import { toAST } from "../../deps.ts";
import { createContext } from "./_test.ts";
import type { BinaryTree, ModifierContext } from "../../core/types.ts";

const context = createContext({});
const block = { display: "block" };

test("selectorTransform", () => {
  const table: [
    BinaryTree<string | number>,
    ...Parameters<typeof selectorTransform>,
    BinaryTree<string | number>,
    ModifierContext,
  ][] = [
    [{}, (selector) => selector, {}, context],
    [
      { block },
      (selector) => `${selector}:hover`,
      { "block:hover": block },
      context,
    ],
    [
      { block },
      (selector) => `${selector}::before`,
      { "block::before": block },
      context,
    ],
    [
      { block },
      (selector) => `[dir="ltr"] ${selector}`,
      { [`[dir="ltr"] block`]: block },
      context,
    ],
    [
      { "@media print": { block } },
      (selector) => `[dir="ltr"] ${selector}`,
      { "@media print": { [`[dir="ltr"] block`]: block } },
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
      context,
    ],
  ];

  table.forEach(([css, transform, result, context]) =>
    expect(selectorTransform(transform)(toAST(css), context)).toEqualJSCSS(
      result,
    )
  );
});
