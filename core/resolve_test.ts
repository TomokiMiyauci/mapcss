import { resolveSpecifierMap } from "./resolve.ts";
import { expect, test } from "../dev_deps.ts";
import { container } from "../preset_tw/specifier/$single.ts";
import { theme } from "../preset_tw/mod.ts";

import type { CSSStatement } from "./types.ts";
const selector = { basic: "" };

test("resolveSpecifierMap", () => {
  const table: [string, CSSStatement[] | undefined][] = [
    ["", undefined],
    ["block", [{
      type: "ruleset",
      selector: { basic: "" },
      declaration: { display: "block" },
    }]],
    ["test", [{
      type: "ruleset",
      selector: { basic: "" },
      declaration: { display: "abc" },
    }]],
    ["container", [{
      declaration: { width: "100%" },
      type: "ruleset",
      selector: {
        basic: "",
      },
    }, {
      declaration: { height: "100%" },
      type: "ruleset",
      selector: {
        basic: "",
      },
    }]],
    ["test1", [{
      declaration: {
        display: "none",
      },
      type: "ruleset",
      selector: { basic: "" },
    }, {
      declaration: {
        "--map-test": 1,
      },
      type: "ruleset",
      selector: { basic: "" },
    }]],
    ["test2", [{
      declaration: {
        display: "none",
      },
      type: "ruleset",
      selector: {
        basic: "",
      },
    }]],
    ["container2", [{
      type: "ruleset",
      declaration: { width: "100%" },
      selector: { basic: "" },
    }]],
    ["inline", [{
      selector: { basic: "" },
      type: "ruleset",
      declaration: { display: "inline" },
    }]],
    ["inline-block", [{
      type: "ruleset",
      declaration: { display: "inline-block" },
      selector: { basic: "" },
    }]],
    ["inline-flex", [{
      type: "ruleset",
      declaration: { display: "inline-flex" },
      selector: { basic: "" },
    }]],
    ["z", [{
      selector: { basic: "" },
      type: "ruleset",
      declaration: { "z-index": "auto" },
    }]],
    ["z-0", [{
      type: "ruleset",
      declaration: { "z-index": 0 },
      selector: { basic: "" },
    }]],
    ["z-1", [{
      type: "ruleset",
      declaration: { "z-index": 1 },
      selector: { basic: "" },
    }, {
      type: "ruleset",
      declaration: { "--test": 1 },
      selector: { basic: "" },
    }]],
    ["z-2", [{
      type: "ruleset",
      declaration: { "z-index": 2 },
      selector: { basic: "" },
    }, {
      type: "ruleset",
      declaration: { "--test": 2 },
      selector: { basic: "" },
    }]],
    ["z-3", [{
      type: "ruleset",
      declaration: { "z-index": 3 },
      selector: { basic: "" },
    }]],
    ["z-4", [{
      type: "ruleset",
      declaration: { "z-index": 4 },
      selector: { basic: "" },
    }]],
    ["z-5", [{
      type: "ruleset",
      declaration: { "z-index": 5 },
      selector: {
        basic: "",
      },
    }]],
    ["z-6", [{
      type: "ruleset",
      declaration: { "z-index": 6 },
      selector: {
        basic: "",
      },
    }, {
      type: "ruleset",
      declaration: { "--test": 6 },
      selector: {
        basic: "",
      },
    }]],
    ["z-7", [{
      type: "ruleset",
      declaration: { "z-index": "7" },
      selector: { basic: "" },
    }]],
    ["z-full", [
      {
        type: "ruleset",
        declaration: { "z-index": 0 },
        selector: { basic: "" },
      },
    ]],
    ["z-[100]", [
      {
        type: "ruleset",
        declaration: { "z-index": "100" },
        selector,
      },
    ]],
    ["container3", [
      {
        type: "ruleset",
        declaration: { width: "100%" },
        selector,
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 640px)",
        children: {
          type: "ruleset",
          declaration: { "max-width": "640px" },
          selector,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 768px)",
        children: {
          type: "ruleset",
          declaration: { "max-width": "768px" },
          selector,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1024px)",
        children: {
          type: "ruleset",
          declaration: { "max-width": "1024px" },
          selector,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1280px)",
        children: {
          type: "ruleset",
          declaration: { "max-width": "1280px" },
          selector,
        },
      },
      {
        type: "groupAtRule",
        identifier: "media",
        rule: "(min-width: 1536px)",
        children: {
          type: "ruleset",
          declaration: { "max-width": "1536px" },
          selector,
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
        "selector": { basic: "" },
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
