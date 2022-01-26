import type { Rule } from "../../core/types.ts";

const OUTLINE_STYLE = "outline-style";

export const outlineStyles: Rule[] = [
  ["outline", { [OUTLINE_STYLE]: "solid" }],
  [
    /^outline-(dashed|dotted|double|hidden)$/,
    ([, prop]) => ({ [OUTLINE_STYLE]: prop }),
  ],
  ["outline-none", {
    outline: "2px solid transparent",
    "outline-offset": "2px",
  }],
];
