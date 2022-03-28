import { customProperty, varFn } from "../../core/utils/format.ts";
import {
  chain,
  deepMerge,
  isEmptyObject,
  isLength0,
  isObject,
  isString,
  isUndefined,
  prop,
  Root,
  Rule,
  SelectorNode,
  SyncProcessor,
  toAST,
} from "../deps.ts";
import {
  classNameNode,
  combinatorNode,
  parseSelector,
  pseudoNode,
  selectorNode,
} from "../deps.ts";
import { $resolveTheme } from "../../core/resolve.ts";
import { removeDuplicatedDecl } from "../../core/postcss/_utils.ts";
import { minifySelector } from "../../core/postcss/minify.ts";
import { recTransform } from "../../utils/recursive.ts";
import type { PresetOption } from "../types.ts";
import type { BinaryTree, CSS, CSSMap } from "../../core/types.ts";

function generateDefault(varPrefix: string, prefix: string) {
  const varFnProperty = (property: string) =>
    chain([prefix, property]).map(join).map((v) => customProperty(v, varPrefix))
      .map(
        varFn,
      ).unwrap();

  const varHeadings = varFnProperty("headings");
  const varLinks = varFnProperty("links");
  const varBorders = varFnProperty("borders");
  const varCaptions = varFnProperty("captions");
  const varCode = varFnProperty("code");
  const varLists = varFnProperty("lists");
  const varHr = varFnProperty("hr");
  const varBgSoft = varFnProperty("bg-soft");

  const DEFAULT = {
    "h1, h2": {
      color: varHeadings,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    a: {
      color: varLinks,
      textDecoration: "underline",
      fontWeight: "500",
    },
    "a code": {
      color: varLinks,
    },
    "p, ul, ol, pre": {
      margin: "1em 0",
      lineHeight: 1.75,
    },
    blockquote: {
      margin: "1em 0",
      paddingLeft: "1em",
      fontStyle: "italic",
      borderLeft: `.25em solid ${varBorders}`,
    },
    h3: {
      margin: "1.5em 0 .5em",
      fontSize: "1.375em",
    },
    h4: {
      margin: "1em 0",
      fontSize: "1.125em",
    },
    "img, video": {
      maxWidth: "100%",
    },
    "figure, picture": {
      margin: "1em 0",
    },
    figcaption: {
      color: varCaptions,
      fontSize: ".875em",
    },
    code: {
      color: varCode,
      fontSize: ".875em",
      fontWeight: 600,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation-Mono, Courier-New, monospace",
    },
    ":not(pre) > code::before, :not(pre) > code::after": {
      content: '"`"',
    },
    pre: {
      padding: "1.25rem 1.5rem",
      overflowX: "auto",
      borderRadius: ".375rem",
    },
    "pre, code": {
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      tabSize: 4,
      "-moz-tab-size": 4,
      "-o-tab-size": 4,
      "-webkit-hyphens": "none",
      "-moz-hyphens": "none",
      hyphens: "none",
      background: "transparent",
    },
    "pre code": {
      fontWeight: "inherit",
    },
    "ol, ul": {
      paddingLeft: "1.25em",
    },
    ul: {
      listStyleType: "disc",
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
      borderCollapse: "collapse",
      overflowX: "auto",
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
      fontSize: ".875em",
      borderRadius: ".25rem",
    },
    details: {
      margin: "1em 0",
      padding: "1.25rem 1.5rem",
      background: varBgSoft,
    },
    summary: {
      cursor: "pointer",
      fontWeight: "600",
    },
  };
  return DEFAULT;
}

const join = (value: string[]): string => value.join("-");

export function depsProse({ css, className: prefix }: Readonly<PresetOption>) {
  const prose: CSSMap = {
    "": (_, { variablePrefix, className }) => {
      const bodyColor = {
        [className]: {
          color: `var(${customProperty(`${prefix}-body`, variablePrefix)})`,
        },
      };

      const DEFAULT = generateDefault(variablePrefix, prefix);

      const [_css, disabledMap] = isolateEntries<
        CSS,
        BinaryTree<false>
      >(
        css,
      );

      const root = mergeAst(deepMerge(_css, DEFAULT), disabledMap);
      const bodyNodes = toAST(bodyColor);

      root.walkRules((rule) => {
        rule.selector = transformSelector(rule.selector, prefix);
      });
      root.append(bodyNodes);

      return root;
    },
    invert: ({ id }, { variablePrefix, className }) => {
      const varProperty = (property: string): string =>
        customProperty(property, variablePrefix);
      const makeVarFnSet = (
        property: string,
      ): [string, string] => [
        chain([prefix, property]).map(join).map(varProperty).unwrap(),
        chain([prefix, id, property]).map(join).map(varProperty).map(varFn)
          .unwrap(),
      ];
      const [varBody, varFnBody] = makeVarFnSet("body");
      const [varHeadings, varFnHeadings] = makeVarFnSet("headings");
      const [varLinks, varFnLinks] = makeVarFnSet("links");
      const [varLists, varFnLists] = makeVarFnSet("lists");
      const [varHr, varFnHr] = makeVarFnSet("hr");
      const [varCaptions, varFnCaptions] = makeVarFnSet("captions");
      const [varCode, varFnCode] = makeVarFnSet("code");
      const [varBorders, varFnBorders] = makeVarFnSet("borders");
      const [varBgSoft, varFnBgSoft] = makeVarFnSet("bg-soft");

      return {
        type: "css",
        value: {
          [className]: {
            [varBody]: varFnBody,
            [varHeadings]: varFnHeadings,
            [varLinks]: varFnLinks,
            [varLists]: varFnLists,
            [varHr]: varFnHr,
            [varCaptions]: varFnCaptions,
            [varCode]: varFnCode,
            [varBorders]: varFnBorders,
            [varBgSoft]: varFnBgSoft,
          },
        },
      };
    },
    "*": ({ id }, context) => {
      const maybeColor = $resolveTheme(id, "color", context);
      const { variablePrefix } = context;
      if (isUndefined(maybeColor)) return;
      const _isString = isString(maybeColor);
      const colorBy = (colorWeight: number): string =>
        _isString ? maybeColor : (() => {
          const _color = prop(colorWeight, maybeColor);
          return isString(_color) ? _color : " ";
        })();

      const varProperty = (property: string): string =>
        customProperty(property, variablePrefix);

      const makeProperty = (...properties: string[]): string =>
        chain(properties).map(join).map(varProperty).unwrap();

      const makePropertySet = (
        property: string,
      ): [string, string] => [
        makeProperty(prefix, property),
        makeProperty(prefix, "invert", property),
      ];

      const [varBody, varInvertBody] = makePropertySet("body");
      const [varHeadings, varInvertHeadings] = makePropertySet("headings");
      const [varLinks, varInvertLinks] = makePropertySet("links");
      const [varLists, varInvertLists] = makePropertySet("lists");
      const [varHr, varInvertHr] = makePropertySet("hr");
      const [varCaptions, varInvertCaptions] = makePropertySet("captions");
      const [varCode, varInvertCode] = makePropertySet("code");
      const [varBorders, varInvertBorders] = makePropertySet("borders");
      const [varBgSoft, varInvertBgSoft] = makePropertySet("bg-soft");

      return {
        type: "css",
        value: {
          [context.className]: {
            [varBody]: colorBy(700),
            [varInvertBody]: colorBy(200),
            [varHeadings]: colorBy(900),
            [varInvertHeadings]: colorBy(100),
            [varLinks]: colorBy(900),
            [varInvertLinks]: colorBy(100),
            [varLists]: colorBy(400),
            [varInvertLists]: colorBy(500),
            [varHr]: colorBy(200),
            [varInvertHr]: colorBy(700),
            [varCaptions]: colorBy(500),
            [varInvertCaptions]: colorBy(400),
            [varCode]: colorBy(900),
            [varInvertCode]: colorBy(100),
            [varBorders]: colorBy(200),
            [varInvertBorders]: colorBy(700),
            [varBgSoft]: colorBy(100),
            [varInvertBgSoft]: colorBy(800),
          },
        },
      };
    },
  };

  return prose;
}

export function removeRuleOrDecl(
  root: Root,
  removeMap: BinaryTree<string>,
): Readonly<Root> {
  const newRoot = root.clone();

  const childRoot = toAST(removeMap);
  // lift up for non parent declaration to rule with no nodes
  childRoot.walkDecls((node) => {
    if (node.parent?.type !== "rule") {
      node.replaceWith(new Rule({ selector: minifySelector(node.prop) }));
    }
  });

  const targetNodes = splitSelectorList(childRoot);

  targetNodes.walkRules((rule) => {
    newRoot.walkRules((node) => {
      if (minifySelector(node.selector) === rule.selector) {
        if (isLength0(rule.nodes)) {
          node.remove();
        } else {
          rule.walkDecls((decl) => {
            node.walkDecls(decl.prop, (child) => {
              // If the declaration block becomes empty, the parent rule is deleted.
              if (
                child.parent?.type === "rule" && child.parent.nodes.length === 1
              ) {
                child.parent.remove();
              } else {
                child.remove();
              }
            });
          });
        }
      }
    });
  });

  return newRoot;
}

export function mergeAst(
  css: CSS,
  disableMap: BinaryTree<string | number | false>,
): Root {
  const root = toAST(css);
  const map = recTransform(disableMap, () => "");

  return chain(splitSelectorList(root)).map((
    root,
  ) => removeRuleOrDecl(root, map)).map(removeDuplicatedDecl)
    .unwrap();
}

export function isolateEntries<
  U extends Record<PropertyKey, unknown>,
  K extends Record<PropertyKey, unknown>,
>(
  value: Record<PropertyKey, any>,
): [U, K] {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (value === false) {
      return [acc[0], { ...acc[1], [key]: value }];
    }

    if (isObject(value)) {
      const [a, b] = isolateEntries(value);
      const _a = isEmptyObject(a) ? {} : { [key]: { ...a } };
      const _b = isEmptyObject(b) ? {} : { [key]: { ...b } };
      return [{ ...acc[0], ..._a }, { ...acc[1], ..._b }];
    }
    return [{ ...acc[0], [key]: value }, acc[1]];
  }, [{}, {}] as [U, K]);
}

function isWhereableNode(node: SelectorNode): boolean {
  return node.type !== "pseudo" ||
    node.type === "pseudo" && node.value === ":not";
}

export function transformSelector(selector: string, className: string): string {
  const processor: SyncProcessor = (root) => {
    root.nodes.forEach((selector) => {
      const pseudos = selector.filter((v) => !isWhereableNode(v));

      const where = pseudoNode({
        "value": ":where",
        nodes: [
          selectorNode({
            value: "",
            nodes: selector.filter(isWhereableNode),
          }),
        ],
      });

      const _classNameNode = classNameNode({ value: className });
      const _combinatorNode = combinatorNode({ value: " " });
      const NOT = "not";
      const notClassName = classNameNode({
        value: `${NOT}-${className}`,
      });
      const not = pseudoNode({
        value: ":not",
        nodes: [notClassName],
      });
      const newSelector = selectorNode({
        value: "",
        nodes: [_classNameNode, _combinatorNode, where, not, ...pseudos],
      });

      selector.replaceWith(newSelector as never);
    });
  };
  const result = parseSelector(processor).processSync(selector, {
    lossless: false,
  });
  return result;
}

export function splitSelectorList(root: Readonly<Root>): Root {
  const newRoot = root.clone();
  newRoot.walkRules((rule) => {
    const rules = rule.selectors.map((selector) => {
      return new Rule({ selector, nodes: rule.nodes });
    });

    rule.replaceWith(rules);
  });
  return newRoot;
}
