import { mergeIdentifierMap } from "./resolve.ts";
import { expect, ParamReturn, test } from "../dev_deps.ts";

test("mergeIdentifierMap", () => {
  const table: ParamReturn<typeof mergeIdentifierMap>[] = [
    [[{}], new Map()],
    [[{ block: { a: "b" } }], new Map([["block", { a: "b" }]])],
    [
      [{ block: { a: "b" } }, { inline: { a: "b" } }],
      new Map([["block", { a: "b" }], ["inline", { a: "b" }]]),
    ],
    [
      [{ block: { a: "b" } }, { block: { a: "b" } }],
      new Map([["block", { a: "b" }]]),
    ],
    [
      [{ block: { a: "b" } }, { block: { b: "b" } }],
      new Map([["block", { b: "b" }]]),
    ],
    [
      [{ inline: { block: { a: "b" } } }],
      new Map([["inline", new Map([["block", { a: "b" }]])]]),
    ],
    [
      [{ inline: { block: { 300: { a: "b" } } } }],
      new Map([[
        "inline",
        new Map([["block", new Map([["300", { a: "b" }]])]]),
      ]]),
    ],
    [
      [{ block: [["a", { b: "c" }]] }],
      new Map([["block", new Map([["a", { b: "c" }]])]]),
    ],
    [
      [{ block: [["a", { b: "c" }]], inline: { block: { "a": "b" } } }],
      new Map([
        [
          "block",
          new Map(
            [["a", { b: "c" } as {}]],
          ),
        ],
        [
          "inline",
          new Map(
            [["block", { a: "b" } as {}]],
          ),
        ],
      ]),
    ],
    // [[{ block: [] }], new Map([["block", {}]])],
  ];

  table.forEach(([identifierMap, result]) =>
    expect(mergeIdentifierMap(identifierMap)).toEqual(result)
  );
});
