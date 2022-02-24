import { customProperty, varFn } from "../../core/utils/format.ts";
import { parseSelector, SelectorType, stringifySelector } from "../../deps.ts";
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
  ["DEFAULT", (_, { variablePrefix }) => {
    const DEFAULT = generateDefault(variablePrefix);

    const selectorListed = Object.entries(DEFAULT).map(([selector, value]) => {
      return {
        selectorList: parseSelector(selector),
        declaration: value,
      };
    });

    const selectorSplitted = selectorListed.map(
      ({ selectorList: _selectorList, ...rest }) => {
        const selectorList = _selectorList.map((selectors) => {
          const i = selectors.findIndex((selector) =>
            (selector.type === SelectorType.Pseudo &&
              selector.name !== "not") ||
            selector.type === SelectorType.PseudoElement
          );
          if (i < 0) return { where: selectors, pseudo: [] };
          const where = selectors.slice(0, i);
          const pseudo = selectors.slice(i);
          return {
            where,
            pseudo,
          };
        });
        return { selectorList, ...rest };
      },
    );

    const css = selectorSplitted.reduce(
      (acc, { declaration, selectorList }) => {
        const selectors = selectorList.map(({ where, pseudo }) => {
          return `.prose :where(${stringifySelector([where])}):not(.not-prose)${
            stringifySelector([pseudo])
          }`;
        });

        return { ...acc, [selectors.join(",")]: declaration };
      },
      {},
    );

    return {
      type: "css",
      value: css,
    };
  }],
];
