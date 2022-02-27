import { astify, constructProperty, objectify, propCamelCase } from "./ast.ts";
import { expect, ParamReturn, test } from "../dev_deps.ts";
import { AtRule, Declaration, Root, Rule } from "../deps.ts";

test("astify", () => {
  const table: ParamReturn<typeof astify>[] = [
    [
      { display: "block" },
      new Root({
        nodes: [
          new Declaration({ "prop": "display", value: "block" }),
        ],
      }),
    ],
    [
      { color: "black", background: "white" },
      new Root({
        nodes: [
          new Declaration({
            prop: "color",
            value: "black",
          }),
          new Declaration({
            prop: "background",
            value: "white",
          }),
        ],
      }),
    ],
    [
      { ".block": { display: "block" } },
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [new Declaration({ prop: "display", value: "block" })],
          }),
        ],
      }),
    ],
    [
      { "@media (min-width: 640px)": { ".block": { display: "block" } } },
      new Root({
        nodes: [
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
        ],
      }),
    ],
    [
      {
        "h1,h2": {
          display: "block",
        },
      },
      new Root({
        nodes: [
          new Rule({
            selector: "h1,h2",
            nodes: [new Declaration({ prop: "display", value: "block" })],
          }),
        ],
      }),
    ],
    [
      {
        "h1,h2": {
          display: "block",
        },
        "h1": {
          display: "inline",
        },
      },
      new Root({
        nodes: [
          new Rule({
            selector: "h1,h2",
            nodes: [new Declaration({ prop: "display", value: "block" })],
          }),
          new Rule({
            selector: "h1",
            nodes: [new Declaration({ prop: "display", value: "inline" })],
          }),
        ],
      }),
    ],
  ];

  table.forEach(([object, result]) =>
    expect(astify(object).toJSON()).toEqual(
      result.toJSON(),
    )
  );
});

test("propCamelCase", () => {
  const table: ParamReturn<typeof propCamelCase>[] = [
    ["", ""],
    ["display", "display"],
    ["font-size", "fontSize"],
    ["transition-timing-function", "transitionTimingFunction"],
    ["-webkit-mask", "WebkitMask"],
    ["-moz-transform", "MozTransform"],
    ["-webkit-mask", "WebkitMask"],
    ["-ms-linear-gradient", "MsLinearGradient"],
    ["--map-css", "--map-css"],
    ["--Map-CSS", "--Map-CSS"],
  ];

  table.forEach(([value, result]) => expect(propCamelCase(value)).toBe(result));
});

test("constructProperty", () => {
  const table: ParamReturn<typeof constructProperty>[] = [
    ["", false, ""],
    ["", true, " !important"],
    ["0", true, "0 !important"],
    ["0", false, 0],
    ["01", false, 1],
    [" ", false, " "],
    ["0.1px", false, "0.1px"],
    ["0.1 px", false, "0.1 px"],
    ["0.1", false, 0.1],
    ["00000000.1", false, 0.1],
    [".1", false, 0.1],
    [".1em", false, ".1em"],
    ["x0", false, "x0"],
    ["block", false, "block"],
    ["1px solid black", false, "1px solid black"],
  ];

  table.forEach(([value, important, result]) =>
    expect(constructProperty(value, important)).toBe(result)
  );
});

test("objectify", () => {
  const table: ParamReturn<typeof objectify>[] = [
    [new Root(), {}],
    [
      new Root({
        nodes: [
          new Rule({
            selector: "",
          }),
        ],
      }),
      {
        "": {},
      },
    ],
    [
      new Root({
        nodes: [
          new Rule({
            selector: ".block",
            nodes: [
              new Declaration({ prop: "block", value: "display" }),
            ],
          }),
        ],
      }),
      {
        ".block": {
          block: "display",
        },
      },
    ],
    [
      new Root({
        nodes: [
          new Declaration({ prop: "", value: "" }),
        ],
      }),
      { "": "" },
    ],
    [
      new Root({
        nodes: [
          new Declaration({ prop: "display", value: "block" }),
        ],
      }),
      { display: "block" },
    ],
    [
      new Root({
        nodes: [
          new Declaration({ prop: "display", value: "block" }),
          new Declaration({ prop: "font-size", value: "1em" }),
        ],
      }),
      { display: "block", fontSize: "1em" },
    ],
    [
      new Root({
        nodes: [
          new AtRule({
            name: "media",
            params: "(min-width: 640px)",
            nodes: [
              new Rule({
                selector: ".sm:!block",
                nodes: [
                  new Declaration({
                    prop: "display",
                    value: "block",
                    important: true,
                  }),
                  new Declaration({
                    prop: "-webkit-transition",
                    value: "all 4s ease",
                  }),
                ],
              }),
            ],
          }),
          new Rule({
            selector: ".text-sm",
            nodes: [
              new Declaration({ prop: "block", value: "display" }),
              new Declaration({ prop: "font-size", value: "16em" }),
            ],
          }),
        ],
      }),
      {
        "@media (min-width: 640px)": {
          ".sm:!block": {
            display: "block !important",
            WebkitTransition: "all 4s ease",
          },
        },
        ".text-sm": {
          block: "display",
          fontSize: "16em",
        },
      },
    ],
  ];

  table.forEach(([ast, result]) => expect(objectify(ast)).toEqual(result));
});
