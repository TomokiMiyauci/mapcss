import { removeDuplicatedDecl } from "./_utils.ts";

import { expect, ParamReturn, test } from "../../dev_deps.ts";
import { Declaration, Root, Rule } from "../deps.ts";

test("removeDuplicatedDecl", () => {
  const table: ParamReturn<typeof removeDuplicatedDecl>[] = [
    [new Root(), new Root()],
    [
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
              new Declaration({
                prop: "display",
                value: "inline",
              }),
            ],
          }),
        ],
      }),
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
            ],
          }),
        ],
      }),
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
              new Declaration({
                prop: "display",
                value: "inline",
              }),
              new Declaration({
                prop: "color",
                value: "red",
              }),
            ],
          }),
        ],
      }),
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
              new Declaration({
                prop: "color",
                value: "red",
              }),
            ],
          }),
        ],
      }),
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
            ],
          }),
          new Rule({
            selector: ".inline",
            nodes: [
              new Declaration({
                prop: "display",
                value: "inline",
              }),
            ],
          }),
        ],
      }),
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({
                prop: "display",
                value: "block",
              }),
            ],
          }),
          new Rule({
            selector: ".inline",
            nodes: [
              new Declaration({
                prop: "display",
                value: "inline",
              }),
            ],
          }),
        ],
      }),
    ],
  ];

  table.forEach(([root, result]) =>
    expect(removeDuplicatedDecl(root).toString()).toEqual(result.toString())
  );
});
