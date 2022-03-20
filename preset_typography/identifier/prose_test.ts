import { isolateEntries, mergeAst, transformSelector } from "./prose.ts";
import { expect, type ParamReturn, test } from "../../dev_deps.ts";
import { toAST } from "../deps.ts";
import type { BinaryTree } from "../../core/types.ts";

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

test("mergeAst", () => {
  const table: [...Parameters<typeof mergeAst>, BinaryTree<string | number>][] =
    [
      [{}, {}, {}],
      [{ a: { color: "red" } }, { a: false }, {}],
      [{ a: { fontWeight: 600 } }, { a: { fontWeight: false } }, {}],
      [{ a: {} }, {}, { a: {} }],
      [{ a: {}, b: {} }, { a: false }, { b: {} }],
      [{ a: {}, b: {} }, { a: false, b: { empty: false } }, { b: {} }],
      [{ a: { fontWeight: 600 } }, { a: { "font-weight": false } }, {}],
      [{ a: { "font-weight": 600 } }, { a: { fontWeight: false } }, {}],
      [{ a: { "font-weight": 600 } }, { a: { "font-weight": false } }, {}],
      [{
        "a:not(h1,h2 ,h3,   h4)": {
          color: "red",
        },
      }, {
        "a:not(h1,h2,h3,h4)": false,
      }, {}],
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
        {},
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
      [
        {
          "h1:hover": {
            color: "red",
          },
        },
        {
          h1: false,
        },
        {
          "h1:hover": {
            color: "red",
          },
        },
      ],
      [
        {
          "h1:hover": {
            color: "red",
          },
        },
        {
          "h1:hover": false,
        },
        {},
      ],
      [
        {
          "h1:hover": {
            color: "red",
          },
        },
        {
          "h1:hover": {
            color: false,
          },
        },
        {},
      ],
      [
        {
          "h1, h2": {
            color: "red",
          },
        },
        {
          "h1, h2": false,
        },
        {},
      ],
      [
        {
          "h1, h2": {
            color: "red",
          },
          h1: {
            fontWeight: 600,
          },
        },
        {
          "h1, h2": false,
        },
        {},
      ],
      [
        {
          ":not(pre) > code::before, :not(pre) > code::after": {
            content: '"`"',
          },
        },
        {
          ":not(pre) > code::before,:not(pre) > code::after": false,
        },
        {},
      ],
      [
        {
          ":not(pre) > code::before, :not(pre) > code::after": {
            content: '"`"',
          },
        },
        {
          ":not(pre)>code::before": {
            content: false,
          },
        },
        {
          ":not(pre) > code::after": {
            content: '"`"',
          },
        },
      ],
      [
        {
          "h1, h2": {
            color: "red",
          },
          h1: {
            fontWeight: 600,
          },
        },
        {
          "h1, h2": {
            color: false,
          },
        },
        {
          "h1": {
            fontWeight: 600,
          },
        },
      ],
    ];

  table.forEach(([css, disableMap, result]) =>
    expect(mergeAst(css, disableMap).toString()).toEqual(
      toAST(result).toString(),
    )
  );
});
