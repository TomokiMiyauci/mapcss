import { splitBracket, splitSimple } from "./extract.ts";
import { expect, ParamReturn } from "../dev_deps.ts";

Deno.test("splitSimple", () => {
  const table: ParamReturn<typeof splitSimple>[] = [
    [``, []],
    [`const a = "relative" <div className={a}>hoge</div>`, [
      "const",
      "a",
      "relative",
      "<div",
      "className",
      "{a}",
      "hoge</div",
    ]],
    [`content-[]`, ["content-[]"]],
    [`content-['']`, ["content-["]],
    [`content[""]`, ["content["]],
  ];
  table.forEach(([value, result]) =>
    expect(splitSimple(value)).toIncludeAllMembers(result)
  );
});

Deno.test("splitBracket", () => {
  const table: ParamReturn<typeof splitBracket>[] = [
    [``, []],
    [`content-[]`, [`content-[]`]],
    [`content-['']`, ["content-['']"]],
    [`content[""]`, [`content[""]`]],
    [`content["   "]`, [`content["   "]`]],
    [`content-[""] content["   "]`, [`content-[""]`, `content["   "]`]],
    [`class="content-[""] content["   "]"`, [
      `class`,
      `content-[""]`,
      `content["   "]`,
    ]],
    [`class='content-[""] content["   "]'`, [
      `class`,
      `content-[""]`,
      `content["   "]`,
    ]],
    [`class='content-["_"] content[" a "][position:static]'`, [
      `class`,
      `content-["_"]`,
      `content[" a "]`,
      `[position:static]`,
    ]],
    [`class='content-["_"] content[" a "] [position:static]'`, [
      `class`,
      `content-["_"]`,
      `content[" a "]`,
      `[position:static]`,
    ]],
    [`[]`, []],
    [`"[]"`, []],
    [`"[][]"`, []],
    [`"[a][]"`, ["[a]"]],
    [`[a][]`, ["[a]"]],
    [`"[a][b]"`, ["[a]", "[b]"]],
    [`\`[a] [b] content-[" "]\``, ["[a]", "[b]", `content-[" "]`]],
    [`\`[a]    [b]    content-[" "]   \``, ["[a]", "[b]", `content-[" "]`]],
  ];
  table.forEach(([value, result]) =>
    expect(splitBracket(value)).toIncludeSameMembers(result)
  );
});

Deno.test("extract by multiple", () => {
  const code = `<div class="static content-[""]"></div>`;
  expect(splitSimple(code).concat(splitBracket(code))).toEqual([
    "<div",
    "class",
    "static",
    "content-[",
    "</div",
    '<div class="static',
    'content-[""]',
    "</div>",
  ]);
});
