import { expect, ParamReturn } from "../dev_deps.ts";
import { constructCSS, resolveCSSMap } from "./resolve.ts";
import { createContext } from "../utils/context.ts";
import type { CSS, CSSMap, RuntimeContext, StaticContext } from "./types.ts";

const block = { display: "block" };
const inlineBlock = { display: "inline-block" };

Deno.test("resolveCSSMap", () => {
  const table: [
    string,
    CSSMap,
    StaticContext & RuntimeContext,
    CSS | undefined,
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
    [
      "i-mdi-check",
      {
        i: {
          mdi: {
            check: { a: "b" },
            "check-circle": {},
          },
        },
      },
      createContext({ className: ".i-mdi-check" }),
      { ".i-mdi-check": { a: "b" } },
    ],
    [
      "i-mdi-check-circle",
      {
        i: {
          mdi: {
            check: { a: "b" },
            "check-circle": { b: "c" },
          },
        },
      },
      createContext({ className: ".i-mdi-check-circle" }),
      { ".i-mdi-check-circle": { b: "c" } },
    ],
    [
      "i-mdi-check-circlex",
      {
        i: {
          mdi: {
            check: { a: "b" },
            "check-circle": { b: "c" },
          },
        },
      },
      createContext({ className: ".i-mdi-check-circle" }),
      undefined,
    ],
    [
      "min-100",
      {
        min: {
          "*": () => {
            return { a: "b" };
          },
        },
      },
      createContext({ className: ".min-100" }),
      { ".min-100": { a: "b" } },
    ],
    [
      "min-100",
      {
        min: {
          100: { b: "c" },
          "*": () => {
            return { a: "b" };
          },
        },
      },
      createContext({ className: ".min-100" }),
      { ".min-100": { b: "c" } },
    ],
  ];

  table.forEach(([value, cssMap, context, result]) => {
    const maybeRoot = resolveCSSMap(value, cssMap, context);
    expect(maybeRoot).toEqual(result);
  });
});

Deno.test("constructCSS", () => {
  const table: ParamReturn<typeof constructCSS>[] = [
    [{}, "", { "": {} }],
    [{}, ".test", { ".test": {} }],
    [{ display: "block" }, ".block", { ".block": { display: "block" } }],
    [{ paddingLeft: 1 }, ".pl-1", { ".pl-1": { paddingLeft: 1 } }],
    [{ "padding-left": 1 }, ".pl-1", { ".pl-1": { "padding-left": 1 } }],
    [{ paddingLeft: 1, paddingRight: 1 }, ".px-1", {
      ".px-1": { paddingLeft: 1, paddingRight: 1 },
    }],
    [{ type: "css", value: {} }, ".test", {}],
    [
      { type: "css", value: { "@keyframe spin": { "100%": { rotate: 360 } } } },
      ".test",
      { "@keyframe spin": { "100%": { rotate: 360 } } },
    ],
    [
      { type: "css", value: { display: "block" } },
      ".test",
      { display: "block" },
    ],
    [
      { type: "css", value: { display: "block" } },
      ".test",
      { display: "block" },
    ],
    [{ type: "decl", value: {} }, ".block", {
      ".block": {},
    }],
    [{ type: "decl", value: { display: "block" } }, ".block", {
      ".block": { display: "block" },
    }],
  ];
  table.forEach(([cssObject, className, result]) =>
    expect(constructCSS(cssObject, className)).toEqual(result)
  );
});
