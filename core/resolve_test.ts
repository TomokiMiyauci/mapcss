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
      declarations: [{ property: "display", value: "block" }],
    }]],
    ["test", [{
      type: "ruleset",
      selector: "",
      order: 0,
      declarations: [{ property: "display", value: "abc" }],
    }]],
    ["container", [{
      declarations: [{ property: "width", value: "100%" }],
      type: "ruleset",
      selector: "",
      order: 0,
    }, {
      declarations: [{ property: "height", value: "100%" }],
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["test1", [{
      declarations: [{ property: "display", value: "none" }],
      type: "ruleset",
      selector: "",
      order: 0,
    }, {
      declarations: [{ property: "--map-test", value: 1 }],
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["test2", [{
      declarations: [{ property: "display", value: "none" }],
      type: "ruleset",
      selector: "",
      order: 0,
    }]],
    ["container2", [{
      type: "ruleset",
      declarations: [{ property: "width", value: "100%" }],
      selector: "",
      order: 0,
    }]],
    ["inline", [{
      selector: "",
      order: 0,
      type: "ruleset",
      declarations: [{ property: "display", value: "inline" }],
    }]],
    ["inline-block", [{
      type: "ruleset",
      declarations: [{ property: "display", value: "inline-block" }],
      selector: "",
      order: 0,
    }]],
    ["inline-flex", [{
      type: "ruleset",
      declarations: [{ property: "display", value: "inline-flex" }],
      selector: "",
      order: 0,
    }]],
    ["z", [{
      selector: "",
      order: 0,
      type: "ruleset",
      declarations: [{ property: "z-index", value: "auto" }],
    }]],
    ["z-0", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 0 }],
      selector: "",
      order: 0,
    }]],
    ["z-1", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 1 }],
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declarations: [{ property: "--test", value: 1 }],
      selector: "",
      order: 0,
    }]],
    ["z-2", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 2 }],
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declarations: [{ property: "--test", value: 2 }],
      selector: "",
      order: 0,
    }]],
    ["z-3", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 3 }],
      selector: "",
      order: 0,
    }]],
    ["z-4", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 4 }],
      selector: "",
      order: 0,
    }]],
    ["z-5", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 5 }],
      selector: "",
      order: 0,
    }]],
    ["z-6", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: 6 }],
      selector: "",
      order: 0,
    }, {
      type: "ruleset",
      declarations: [{ property: "--test", value: 6 }],
      selector: "",
      order: 0,
    }]],
    ["z-7", [{
      type: "ruleset",
      declarations: [{ property: "z-index", value: "7" }],
      selector: "",
      order: 0,
    }]],
    ["z-full", [
      {
        type: "ruleset",
        declarations: [{ property: "z-index", value: 0 }],
        selector: "",
        order: 0,
      },
    ]],
    ["z-[100]", [
      {
        type: "ruleset",
        declarations: [{ property: "z-index", value: "100" }],
        selector: "",
        order: 0,
      },
    ]],
    ["container3", [
      {
        type: "ruleset",
        declarations: [{ property: "width", value: "100%" }],
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
          declarations: [{ property: "max-width", value: "640px" }],
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
          declarations: [{ property: "max-width", value: "768px" }],
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
          declarations: [{ property: "max-width", value: "1024px" }],
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
          declarations: [{ property: "max-width", value: "1280px" }],
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
          declarations: [{ property: "max-width", value: "1536px" }],
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
        declaration: {
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
