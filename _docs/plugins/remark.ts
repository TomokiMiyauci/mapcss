import { valueToEstree } from "https://esm.sh/estree-util-value-to-estree?pin=v66";
import { visit } from "https://esm.sh/unist-util-visit";
import { load } from "https://esm.sh/js-yaml";
import { parse } from "https://esm.sh/toml";
import { isObject } from "https://deno.land/x/isx@v1.0.0-beta.17/mod.ts";
import { Plugin } from "https://esm.sh/unified@10.1.1?pin=v66";
import { Root } from "https://esm.sh/mdast-util-assert?pin=v66";
import { MdxjsEsm } from "https://esm.sh/mdast-util-mdx?pin=v66";

export const remarkFrontmatterPageProps: Plugin<string[], Root> = (
  name = "meta",
) => {
  return (root) => {
    const data: Record<PropertyKey, any>[] = [];
    visit(root, "yaml", ({ value }) => {
      const _ = load(value);
      if (!isObject(_)) {
        throw new Error(
          `Expected frontmatter data to be an object, got:\n${value}`,
        );
      }
      data.push(_);
    });
    visit(root, "toml", (node: any) => {
      const value = parse(node.value);
      if (!isObject(value)) {
        throw new Error(
          `Expected frontmatter data to be an object, got:\n${node.value}`,
        );
      }
      data.push(value);
    });

    if (!data.length) return;
    const props = {
      [name]: data.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    };

    const mdxJsEsm: MdxjsEsm = {
      "type": "mdxjsEsm",
      value: "",
      "data": {
        estree: {
          "type": "Program",
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "declaration": {
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "id": {
                      "type": "Identifier",
                      "name": "ssr",
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "properties": [
                        {
                          "type": "Property",
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "name": "props",
                          },
                          "value": {
                            "type": "ArrowFunctionExpression",
                            "expression": true,
                            "generator": false,
                            "async": false,
                            "params": [],
                            "body": valueToEstree(props),
                          },
                          "kind": "init",
                        },
                      ],
                    },
                  },
                ],
                "kind": "const",
              },
              "specifiers": [],
              "source": null,
            },
          ],
          "sourceType": "module",
        },
      },
    };

    root.children.unshift(mdxJsEsm as never);
  };
};
