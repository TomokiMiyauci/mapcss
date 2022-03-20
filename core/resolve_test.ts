import { expect, test } from "../dev_deps.ts";
import { resolveCSSMap } from "./resolve.ts";
import { Root } from "./deps.ts";
import { createContext } from "../utils/context.ts";
import type {
  BinaryTree,
  CSSMap,
  RuntimeContext,
  StaticContext,
} from "./types.ts";

const block = { display: "block" };
const inlineBlock = { display: "inline-block" };

test("resolveCSSMap", () => {
  const table: [
    string,
    CSSMap,
    StaticContext & RuntimeContext,
    BinaryTree<string | number> | undefined,
  ][] = [
    [
      "block",
      { block: block },
      createContext({ className: ".block" }),
      {
        ".block": block,
      },
    ],
    [
      "block",
      { block: { "": block } },
      createContext({ className: ".block" }),
      {
        ".block": block,
      },
    ],
    [
      "inline-block",
      {
        inline: { block: { display: "inline-block" } },
      },
      createContext({ className: ".inline-block" }),
      {
        ".inline-block": { display: "inline-block" },
      },
    ],
    [
      "inline-block",
      {
        inline: { block: { "": inlineBlock } },
      },
      createContext({ className: ".inline-block" }),
      {
        ".inline-block": inlineBlock,
      },
    ],
    [
      "inline",
      {
        inline: { block: inlineBlock },
      },
      createContext({ className: ".inline-block" }),
      undefined,
    ],
    [
      "block",
      { block: { type: "css", value: { ".block": block } } },
      createContext(),
      { ".block": block },
    ],
    [
      "block",
      {
        block: {
          "": { type: "css", value: { ".block": block } },
        },
      },
      createContext(),
      { ".block": block },
    ],
    ["block", { block: new Root({ nodes: [] }) }, createContext(), {}],
    [
      "block",
      { block: () => block },
      createContext({ className: ".test" }),
      { ".test": block },
    ],
    [
      "block",
      { block: { "": () => block } },
      createContext({ className: ".test" }),
      { ".test": block },
    ],
    [
      "block",
      {
        block: {
          "": (_, { variablePrefix }) => ({
            [`--${variablePrefix}test`]: "test",
          }),
        },
      },
      createContext({ className: ".test" }),
      { ".test": { "--map-test": "test" } },
    ],
  ];

  table.forEach(([value, cssMap, context, result]) => {
    const maybeRoot = resolveCSSMap(value, cssMap, context);
    if (maybeRoot && result) {
      expect(maybeRoot).toEqualJSCSS(result);
    } else {
      expect(maybeRoot).toBe(result);
    }
  });
});
