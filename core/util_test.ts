import { mergeConfig } from "./util.ts";
import { anyFunction, expect, ParamReturn } from "../dev_deps.ts";

Deno.test("mergeConfig", () => {
  const table: ParamReturn<typeof mergeConfig>[] = [
    [{}, {}, {}],
    [
      {
        css: {},
      },
      { css: {} },
      {
        css: [{}, {}],
      },
    ],
    [
      {
        css: { a: {} },
      },
      { css: [{}] },
      {
        css: [{ a: {} }, {}],
      },
    ],
    [
      {
        css: { a: {} },
      },
      {
        cssMap: {
          block: { display: "block" },
        },
      },
      {
        cssMap: {
          block: { display: "block" },
        },
        css: [{ a: {} }],
      },
    ],
    [
      {
        preset: [{
          name: "preset1",
          fn: () => ({}),
        }],
      },
      {
        preset: [{
          name: "preset2",
          fn: () => ({}),
        }],
      },
      {
        preset: [
          { name: "preset1", fn: anyFunction() as any },
          { name: "preset2", fn: anyFunction() as any },
        ],
      },
    ],
  ];

  table.forEach(([a, b, result]) => expect(mergeConfig(a, b)).toEqual(result));
});
