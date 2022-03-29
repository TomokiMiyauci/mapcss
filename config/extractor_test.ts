import {
  applyExtractor,
  bracketExtractor,
  simpleExtractor,
} from "./extractor.ts";
import { expect, ParamReturn } from "../dev_deps.ts";

Deno.test("applyExtractor", () => {
  const table: ParamReturn<typeof applyExtractor>[] = [
    ["static block", simpleExtractor, new Set(["static", "block"])],
    [
      "static block [position:static]",
      simpleExtractor,
      new Set(["static", "block", "[position:static]"]),
    ],
    [
      `static block content-[""]`,
      simpleExtractor,
      new Set(["static", "block", "content-["]),
    ],
    [
      `static block content-[""]`,
      [simpleExtractor, bracketExtractor],
      new Set(["static", "block", "content-[", "static block", `content-[""]`]),
    ],
    [
      `<div class="content-['\`']">
  <span class="static">[hoge]</span>
</div>`,
      [simpleExtractor, bracketExtractor],
      new Set([
        "<div",
        "class",
        "content-[",
        "<span",
        "static",
        "[hoge]</span",
        "</div",
        "<div class",
        "content-['`']",
        '<span class="static',
        "[hoge]",
        "</span>\n</div>",
      ]),
    ],
  ];

  table.forEach(([input, extractor, result]) =>
    expect(applyExtractor(input, extractor)).toEqual(result)
  );
});
