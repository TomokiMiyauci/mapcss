import {
  isolateEntries,
  removeRuleOrDecl,
  toAst,
  transformSelector,
} from "./prose.ts";
import { Declaration, Root, Rule } from "../../deps.ts";
import { astify } from "../../core/ast.ts";
import { expect, type ParamReturn, test } from "../../dev_deps.ts";
import type { Tree } from "../../core/types.ts";

test("transformWhere", () => {
  const table: [...ParamReturn<typeof transformSelector>][] = [
    ["h1", "prose", ".prose :where(h1):not(.not-prose)"],
    [
      "h1, h2",
      "prose",
      ".prose :where(h1):not(.not-prose),.prose :where(h2):not(.not-prose)",
    ],
    [
      "p,ul",
      "prose",
      ".prose :where(p):not(.not-prose),.prose :where(ul):not(.not-prose)",
    ],
    ["h1:hover", "prose", ".prose :where(h1):not(.not-prose):hover"],
    ["a code", "prose", ".prose :where(a code):not(.not-prose)"],
    [
      ":not(pre) > code::before",
      "prose",
      ".prose :where(:not(pre)>code):not(.not-prose)::before",
    ],
    [
      "ol > li::marker",
      "prose",
      ".prose :where(ol>li):not(.not-prose)::marker",
    ],
    [
      "tr:nth-child(2n)",
      "typography",
      ".typography :where(tr):not(.not-typography):nth-child(2n)",
    ],
    [
      "ol > li::marker,ul > li::marker,summary::marker",
      "prose",
      ".prose :where(ol>li):not(.not-prose)::marker,.prose :where(ul>li):not(.not-prose)::marker,.prose :where(summary):not(.not-prose)::marker",
    ],
    [
      ":not(pre) > code::before,:not(pre) > code::after",
      "prose",
      ".prose :where(:not(pre)>code):not(.not-prose)::before,.prose :where(:not(pre)>code):not(.not-prose)::after",
    ],
  ];

  table.forEach(([selector, className, result]) =>
    expect(transformSelector(selector, className)).toBe(result)
  );
});

test("isolateEntries", () => {
  const table: ParamReturn<typeof isolateEntries>[] = [
    [{}, [{}, {}]],
    [{ a: 1 }, [{ a: 1 }, {}]],
    [{ a: 1, b: false }, [{
      a: 1,
    }, { b: false }]],
    [
      { a: 1, b: false, c: { a: false } },
      [{
        a: 1,
      }, {
        b: false,
        c: { a: false },
      }],
    ],
    [
      { a: 1, b: false, c: { a: false }, d: { a: "a", b: "b", c: false } },
      [{
        a: 1,
        d: {
          a: "a",
          b: "b",
        },
      }, {
        b: false,
        c: { a: false },
        d: {
          c: false,
        },
      }],
    ],
    [
      {
        a: 1,
        b: false,
        c: { a: false, b: "b", c: { d: "d", e: false } },
        d: { a: "a", b: "b", c: false },
      },
      [{
        a: 1,
        c: { b: "b", c: { d: "d" } },
        d: {
          a: "a",
          b: "b",
        },
      }, {
        b: false,
        c: { a: false, c: { e: false } },
        d: {
          c: false,
        },
      }],
    ],
  ];

  table.forEach(([value, result]) =>
    expect(isolateEntries(value)).toEqual(result)
  );
});

test("removeRuleOrDecl", () => {
  const table: ParamReturn<typeof removeRuleOrDecl>[] = [
    [new Root(), {}, new Root()],
    [
      new Root({ nodes: [new Rule({ selector: "a", nodes: [] })] }),
      {},
      new Root({ nodes: [new Rule({ selector: "a", nodes: [] })] }),
    ],
    [
      new Root({ nodes: [new Rule({ selector: "a", nodes: [] })] }),
      { a: false },
      new Root(),
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: "a",
            nodes: [new Declaration({ prop: "display", value: "" })],
          }),
        ],
      }),
      { a: false },
      new Root(),
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: "a",
          }),
        ],
      }),
      {
        a: {
          block: false,
        },
      },
      new Root({ nodes: [new Rule({ selector: "a" })] }),
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: "a",
            nodes: [
              new Declaration({
                prop: "a",
                value: "",
              }),
              new Declaration({
                prop: "b",
                value: "",
              }),
            ],
          }),
        ],
      }),
      {
        a: {
          b: false,
        },
      },
      new Root({
        nodes: [
          new Rule({
            selector: "a",
            nodes: [
              new Declaration({
                prop: "a",
                value: "",
              }),
            ],
          }),
        ],
      }),
    ],
    [
      new Root({
        nodes: astify({
          a: {
            color: "red",
            fontWeight: "1.6em",
          },
          h1: {
            color: "blue",
            "line-height": "1",
          },
          pre: {
            content: `"'"`,
          },
        }),
      }),
      {
        pre: {
          content: false,
        },
        a: {
          "font-weight": false,
        },
        h1: false,
      },
      new Root({
        nodes: astify({
          a: {
            color: "red",
          },
          pre: {},
        }),
      }),
    ],
    [
      new Root({
        nodes: astify({
          "pre, code": {
            color: "red",
            fontWeight: "1.6em",
          },
        }),
      }),
      {
        pre: false,
      },
      new Root({
        nodes: astify({
          "pre, code": {
            color: "red",
            fontWeight: "1.6em",
          },
        }),
      }),
    ],
  ];

  table.forEach(([root, removeMap, result]) =>
    expect(removeRuleOrDecl(root, removeMap).toString()).toBe(result.toString())
  );
});

test("toAst", () => {
  const table: [...Parameters<typeof toAst>, Tree<string | number>][] = [
    [{}, {}, {}],
    [
      {
        a: {
          color: "red",
        },
      },
      {
        a: {
          color: false,
        },
      },
      {
        a: {},
      },
    ],
    [
      {
        a: {
          color: "red",
          "font-weight": 600,
        },
      },
      {
        a: {
          "font-weight": false,
        },
      },
      {
        a: {
          color: "red",
        },
      },
    ],
    [
      {
        "h1, h2": {
          color: "red",
          "font-weight": 600,
        },
      },
      {},
      {
        h1: {
          color: "red",
          "font-weight": 600,
        },
        h2: {
          color: "red",
          "font-weight": 600,
        },
      },
    ],
    [
      {
        "h1, h2": {
          color: "red",
          "font-weight": 600,
        },
      },
      { h1: false },
      {
        h2: {
          color: "red",
          "font-weight": 600,
        },
      },
    ],
    [
      {
        "h1, h2": {
          color: "red",
          "font-weight": 600,
        },
      },
      {
        h1: false,
        h2: {
          color: false,
        },
      },
      {
        h2: {
          "font-weight": 600,
        },
      },
    ],
    [
      {
        "h1, h2": {
          color: "red",
          "font-weight": 600,
        },
        h1: {
          display: "block",
        },
      },
      {
        h1: false,
        h2: {
          color: false,
        },
      },
      {
        h2: {
          "font-weight": 600,
        },
      },
    ],
  ];

  table.forEach(([css, disableMap, result]) =>
    expect(toAst(css, disableMap).toString()).toEqual(
      new Root({ nodes: astify(result) }).toString(),
    )
  );
});
