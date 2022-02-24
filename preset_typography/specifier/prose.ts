import { customProperty, varFn } from "../../core/utils/format.ts";
import { astify } from "../../core/ast.ts";
import { Root } from "../../deps.ts";
import parse, { Node } from "https://esm.sh/postcss-selector-parser";
import type { EntriesSpecifier } from "../../core/types.ts";

function generateDefault(varPrefix: string) {
  const varFnProperty = (property: string) =>
    varFn(customProperty(property, varPrefix));

  const varHeadings = varFnProperty("prose-headings");
  const varLinks = varFnProperty("prose-links");
  const varBorders = varFnProperty("prose-borders");
  const varCaptions = varFnProperty("prose-captions");
  const varCode = varFnProperty("prose-code");
  const varLists = varFnProperty("prose-lists");
  const varHr = varFnProperty("prose-hr");
  const varBgSoft = varFnProperty("prose-bg-soft");

  const DEFAULT = {
    "h1, h2, h3, h4, h5, h6": {
      color: varHeadings,
      "font-weight": 600,
      "line-height": 1.25,
    },
    a: {
      color: varLinks,
      "text-decoration": "underline",
      "font-weight": "500",
    },
    "a code": {
      color: varLinks,
    },
    "p, ul, ol, pre": {
      margin: "1em 0",
      "line-height": 1.75,
    },
    "blockquote": {
      margin: "1em 0",
      "padding-left": "1em",
      "font-style": "italic",
      "border-left": `.25em solid ${varBorders}`,
    },
    h3: {
      margin: "1.5em 0 .5em",
      "font-size": "1.375em",
    },
    h4: {
      margin: "1em 0",
      "font-size": "1.125em",
    },
    "img, video": {
      "max-width": "100%",
    },
    "figure, picture": {
      margin: "1em 0",
    },
    figcaption: {
      color: varCaptions,
      "font-size": ".875em",
    },
    code: {
      color: varCode,
      "font-size": ".875em",
      "font-weight": 600,
      "font-family":
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation-Mono, Courier-New, monospace",
    },
    ":not(pre) > code::before, :not(pre) > code::after": {
      content: '"`"',
    },
    pre: {
      padding: "1.25rem 1.5rem",
      "overflow-x": "auto",
      "border-radius": ".375rem",
    },
    "pre, code": {
      "white-space": "pre",
      "word-spacing": "normal",
      "word-break": "normal",
      "word-wrap": "normal",
      "-moz-tab-size": 4,
      "-o-tab-size": 4,
      "tab-size": 4,
      "-webkit-hyphens": "none",
      "-moz-hyphens": "none",
      hyphens: "none",
      background: "transparent",
    },
    "pre code": {
      "font-weight": "inherit",
    },
    "ol, ul": {
      "padding-left": "1.25em",
    },
    ul: {
      "list-style-type": "disc",
    },
    "ol > li::marker, ul > li::marker, summary::marker": {
      color: varLists,
    },
    hr: {
      margin: "2em 0",
      border: `1px solid ${varHr}`,
    },
    table: {
      display: "block",
      margin: "1em 0",
      "border-collapse": "collapse",
      "overflow-x": "auto",
    },
    "tr:nth-child(2n)": {
      background: varBgSoft,
    },
    "td, th": {
      border: `1px solid ${varBorders}`,
      padding: ".625em 1em",
    },
    abbr: {
      cursor: "help",
    },
    kbd: {
      color: varCode,
      border: "1px solid",
      padding: ".25rem .5rem",
      "font-size": ".875em",
      "border-radius": ".25rem",
    },
    details: {
      margin: "1em 0",
      padding: "1.25rem 1.5rem",
      background: varBgSoft,
    },
    summary: {
      cursor: "pointer",
      "font-weight": "600",
    },
  };
  return DEFAULT;
}

export const prose: EntriesSpecifier = [
  ["DEFAULT", (_, { variablePrefix, className, key }) => {
    const maxWidth = {
      [className]: {
        color: customProperty(`${key}-body`, variablePrefix),
        "max-width": "65ch",
      },
    };
    const DEFAULT = generateDefault(variablePrefix);

    const nodes = astify(DEFAULT);
    const widthNodes = astify(maxWidth);

    const root = new Root({ nodes });
    root.walkRules((rule) => {
      rule.selector = transformSelector(rule.selector, key);
    });
    root.append(widthNodes);

    return root;
  }],
];

function isWhereableNode(node: Node): boolean {
  return node.type !== "pseudo" ||
    node.type === "pseudo" && node.value === ":not";
}

export function transformSelector(selector: string, className: string): string {
  const result = parse((root) => {
    root.nodes.forEach((selector) => {
      const pseudos = selector.filter((v) => !isWhereableNode(v));

      const where = parse.pseudo({
        "value": ":where",
        nodes: [
          parse.selector({
            value: "",
            nodes: selector.filter(isWhereableNode),
          }),
        ],
      });

      const classNameNode = parse.className({ value: className });
      const combinator = parse.combinator({ value: " " });
      const NOT = "not";
      const notClassName = parse.className({ value: `${NOT}-${className}` });
      const not = parse.pseudo({ value: ":not", nodes: [notClassName] });
      const newSelector = parse.selector({
        value: "",
        nodes: [classNameNode, combinator, where, not, ...pseudos],
      });

      selector.replaceWith(newSelector);
    });
  }).processSync(selector, { lossless: false });
  return result;
}
