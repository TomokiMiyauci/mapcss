import { fromPlainObject } from "./ast.ts";
import { expect, test } from "../dev_deps.ts";
import { AtRule, Declaration, Root, Rule } from "../deps.ts";

type ParamReturn<T extends (...args: any[]) => unknown> = [
  ...Parameters<T>,
  ReturnType<T>,
];

test("fromPlainObject", () => {
  const table: ParamReturn<typeof fromPlainObject>[] = [
    [{ display: "block" }, [
      new Declaration({ "prop": "display", value: "block" }),
    ]],
    [{ color: "black", background: "white" }, [
      new Declaration({
        prop: "color",
        value: "black",
      }),
      new Declaration({
        prop: "background",
        value: "white",
      }),
    ]],
    [{ ".block": { display: "block" } }, [
      new Rule({
        selector: ".block",
        nodes: [new Declaration({ prop: "display", value: "block" })],
      }),
    ]],
    [{ "@media (min-width: 640px)": { ".block": { display: "block" } } }, [
      new AtRule({
        name: "media",
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [new Declaration({ prop: "display", value: "block" })],
          }),
        ],
        params: "(min-width: 640px)",
      }),
    ]],
  ];

  table.forEach(([object, result]) =>
    expect(new Root({ nodes: fromPlainObject(object) }).toJSON()).toEqual(
      new Root({ nodes: result }).toJSON(),
    )
  );
});