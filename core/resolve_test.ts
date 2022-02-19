import { resolveSpecifierMap } from "./resolve.ts";
import { expect, test } from "../dev_deps.ts";
import { container } from "../preset_tw/specifier/$single.ts";
import { theme } from "../preset_tw/mod.ts";

import type { CSSStatement } from "./types.ts";

test("resolveSpecifierMap", () => {
  const table: [string, CSSStatement[] | undefined][] = [
    ["", undefined],
    ["block", [{
      type: "ruleset",
      selector: "",
      order: 0,
      declaration: { display: "block" },
    }]],
    ["test", [{
      type: "ruleset",
      selector: "",
      order: 0,
      declaration: { display: "abc" },
    }]],
    ["container", [{
      declaration: { width: "100%" },
      type: "ruleset",
      selector: "",
      order: 0,
    }, {
      declaration: { height: "100%" },
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["test1", [{
      declaration: {
        display: "none",
      },
      type: "ruleset",
      selector: "",
      order: 0,
    }, {
      declaration: {
        "--map-test": 1,
      },
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["test2", [{
      declaration: {
        display: "none",
      },
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["container2", [{
      type: "ruleset",
      declaration: { width: "100%" },
      selector: "",
      order: 0,
    }]],
    ["inline", [{
      selector: "",
      order: 0,
      type: "ruleset",
      declaration: { display: "inline" },
    }]],
    ["inline-block", [{
      type: "ruleset",
      declaration: { display: "inline-block" },
      selector: "",
      order: 0,
    }]],
    ["inline-flex", [{
      type: "ruleset",
      declaration: { display: "inline-flex" },
      selector: "",
      order: 0,
    }]],
    ["z", [{
      selector: "",
      order: 0,
      type: "ruleset",
      declaration: { "z-index": "auto" },
    }]],
    ["z-0", [{
      type: "ruleset",
      declaration: { "z-index": 0 },
      selector: "",
      order: 0,
    }]],
    ["z-1", [{
      type: "ruleset",
      declaration: { "z-index": 1 },
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declaration: { "--test": 1 },
      selector: "",
      order: 0,
    }]],
    ["z-2", [{
      type: "ruleset",
      declaration: { "z-index": 2 },
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declaration: { "--test": 2 },
      selector: "",
      order: 0,
    }]],
    ["z-3", [{
      type: "ruleset",
      declaration: { "z-index": 3 },
      selector: "",
      order: 0,
    }]],
    ["z-4", [{
      type: "ruleset",
      declaration: { "z-index": 4 },
      selector: "",
      order: 0,
    }]],
    ["z-5", [{
      type: "ruleset",
      declaration: { "z-index": 5 },
      selector: "",
      order: 0,
    }]],
    ["z-6", [{
      type: "ruleset",
      declaration: { "z-index": 6 },
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declaration: { "--test": 6 },
      selector: "",
      order: 0,
    }]],
    ["z-7", [{
      type: "ruleset",
      declaration: { "z-index": "7" },
      selector: "",
      order: 0,
    }]],
    ["z-full", [
      {
        type: "ruleset",
        declaration: { "z-index": 0 },
        selector: "",
        order: 0,
      },
    ]],
    ["z-[100]", [
      {
        type: "ruleset",
        declaration: { "z-index": "100" },
        selector: "",
        order: 0,
      },
    ]],
    ["container3", [
      {
        type: "ruleset",
        declaration: { width: "100%" },
        selector: "",
        order: 0,
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 640px)",
        order: 1,
        children: {
          type: "ruleset",
          declaration: { "max-width": "640px" },
          selector: "",
          order: 0,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 768px)",
        order: 2,
        children: {
          type: "ruleset",
          declaration: { "max-width": "768px" },
          selector: "",
          order: 0,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1024px)",
        order: 3,
        children: {
          type: "ruleset",
          declaration: { "max-width": "1024px" },
          selector: "",
          order: 0,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1280px)",
        order: 4,
        children: {
          type: "ruleset",
          declaration: { "max-width": "1280px" },
          selector: "",
          order: 0,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1536px)",
        order: 5,
        children: {
          type: "ruleset",
          declaration: { "max-width": "1536px" },
          selector: "",
          order: 0,
        },
      },
    ]],
  ];
  table.forEach(([specifier, result]) =>
    expect(resolveSpecifierMap(specifier, {
      block: { display: "block" },
      container: [{ width: "100%" }, { height: "100%" }],
      container2: {
        type: "ruleset",
        "declaration": {
          width: "100%",
        },
      },
      test: () => ({ display: "abc" }),
      test1: () => {
        return [{ display: "none" }, { "--map-test": 1 }] as [
          { display: "none" },
          { "--map-test": 1 },
        ];
      },
      test2: () => ({ type: "ruleset", declaration: { display: "none" } }),
      inline: {
        DEFAULT: { display: "inline" },
        block: { display: "inline-block" },
        flex: () => ({ display: "inline-flex" }),
      },
      z: [
        ["DEFAULT", { "z-index": "auto" }],
        [0, { "z-index": 0 }],
        [1, [{ "z-index": 1 }, { "--test": 1 }]],
        ["2", [{ "z-index": 2 }, { "--test": 2 }]],
        [3, () => ({ "z-index": 3 })],
        [4, () => [{ "z-index": 4 }]],
        [5, { type: "ruleset", declaration: { "z-index": 5 } }],
        [6, [{ type: "ruleset", declaration: { "z-index": 6 } }, {
          type: "ruleset",
          declaration: { "--test": 6 },
        }]],
        [/^1$/, { "z-index": "false" }],
        [/^(\d+)$/, ([, body]) => ({ "z-index": body })],
        [/^\[(.+)\]$/, ([, body]) => [{ "z-index": body }]],
        [/^(.+)$/, [{ "z-index": 0 }]],
      ],
      container3: container,
      break: {
        after: {
          avoid: { "break-after": "avoid" },
        },
      },
    }, {
      separator: "-",
      theme,
      variablePrefix: "",
      token: "",
    })).toEqual(result)
  );
});
