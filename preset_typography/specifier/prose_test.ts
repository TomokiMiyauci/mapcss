import { transformSelector } from "./prose.ts";
import { expect, type ParamReturn, test } from "../../dev_deps.ts";

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
