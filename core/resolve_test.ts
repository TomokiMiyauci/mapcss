import { expect, ParamReturn, test } from "../dev_deps.ts";
import { defaultify, mergeCSSMap, resolveCSSMap } from "./resolve.ts";
import { Root } from "../deps.ts";
import type { BinaryTree, CSSMap, IdentifierContext } from "./types.ts";

const block = { display: "block" };
const inlineBlock = { display: "inline-block" };
test("mergeCSSMap", () => {
  const table: ParamReturn<typeof mergeCSSMap>[] = [
    [[{}], {}],
    [[{ block }], { block: { "": block } }],
    [[{ block }, {
      inline: { block: inlineBlock },
    }], {
      block: { "": block },
      inline: {
        block: { "": inlineBlock },
      },
    }],
    [[{ block }, { block: { "": block } }], { block: { "": block } }],
    [[{ block }, { block: { display: "inline-block" } }], {
      block: { "": { display: "inline-block" } },
    }],
    [[{ block }, { block: { "": { display: "inline-block" } } }], {
      block: { "": { display: "inline-block" } },
    }],
  ];

  table.forEach(([cssMap, result]) =>
    expect(mergeCSSMap(cssMap)).toEqual(result)
  );
});

test("defaultify", () => {
  const table: ParamReturn<typeof defaultify>[] = [
    [{}, {}],
    [{ block }, { block: { "": block } }],
    [{ block: { "": block } }, { block: { "": block } }],
    [{ block: { "": block }, inline: { block: { display: "inline-block" } } }, {
      block: { "": block },
      inline: { block: { "": { display: "inline-block" } } },
    }],
    [{ block, flex: { display: "flex" } }, {
      block: { "": block },
      flex: { "": { display: "flex" } },
    }],
    [
      {
        block: { "": { display: "block" } },
        flex: { "": { display: "flex" } },
      },
      {
        block: { "": { display: "block" } },
        flex: { "": { display: "flex" } },
      },
    ],
    [{ block: { "$DEFAULT": {} } }, { block: { "$DEFAULT": { "": {} } } }],
    [{ block: { "": {}, "$DEFAULT": {} } }, {
      block: { "": {}, "$DEFAULT": { "": {} } },
    }],
  ];

  table.forEach(([cssMap, result]) =>
    expect(defaultify(cssMap)).toEqual(result)
  );
});

function createCSSMapContext(
  context: Partial<IdentifierContext> = {},
): IdentifierContext {
  return {
    separator: "-",
    charMap: {},
    token: "class-name",
    className: ".class-name",
    identifier: "class-name",
    mappedToken: "class-name",
    theme: {},
    variablePrefix: "map-",
    key: "",
    parentKey: "",
    path: [],
    ...context,
  };
}
test("resolveCSSMap", () => {
  const table: [
    string,
    CSSMap,
    IdentifierContext,
    BinaryTree<string | number> | undefined,
  ][] = [
    [
      "block",
      { block: block },
      createCSSMapContext({ className: ".block" }),
      {
        ".block": block,
      },
    ],
    [
      "block",
      { block: { "": block } },
      createCSSMapContext({ className: ".block" }),
      {
        ".block": block,
      },
    ],
    [
      "inline-block",
      {
        inline: { block: { display: "inline-block" } },
      },
      createCSSMapContext({ className: ".inline-block" }),
      {
        ".inline-block": { display: "inline-block" },
      },
    ],
    [
      "inline-block",
      {
        inline: { block: { "": inlineBlock } },
      },
      createCSSMapContext({ className: ".inline-block" }),
      {
        ".inline-block": inlineBlock,
      },
    ],
    [
      "inline",
      {
        inline: { block: inlineBlock },
      },
      createCSSMapContext({ className: ".inline-block" }),
      undefined,
    ],
    [
      "block",
      { block: { type: "css", value: { ".block": block } } },
      createCSSMapContext(),
      { ".block": block },
    ],
    [
      "block",
      {
        block: {
          "": { type: "css", value: { ".block": block } },
        },
      },
      createCSSMapContext(),
      { ".block": block },
    ],
    ["block", { block: new Root({ nodes: [] }) }, createCSSMapContext(), {}],
    [
      "block",
      { block: () => block },
      createCSSMapContext({ className: ".test" }),
      { ".test": block },
    ],
    [
      "block",
      { block: { "": () => block } },
      createCSSMapContext({ className: ".test" }),
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
      createCSSMapContext({ className: ".test" }),
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
