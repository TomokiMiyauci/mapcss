import { generate, mapChar } from "./generate.ts";
import { expect, test } from "../dev_deps.ts";
import type { Config } from "./types.ts";
test("mapChar", () => {
  const table: [
    ...Parameters<typeof mapChar>,
    ReturnType<typeof mapChar>,
  ][] = [
    ["abcdefg", {}, "abcdefg"],
    ["[calc(100vh_-_3px)]", { "_": " " }, "[calc(100vh - 3px)]"],
  ];
  table.forEach(([char, charMap, result]) =>
    expect(mapChar(char, charMap)).toBe(result)
  );
});

test("generate option of css should generate css statement directory", () => {
  const table: [Partial<Config>, string, string][] = [
    [{}, "", ""],
    [
      {
        css: {
          "*": { color: "red" },
        },
      },
      "",
      "*{color:red}",
    ],
    [
      {
        css: {
          body: { fontSize: "1rem" },
          "a:hover": { color: "red" },
        },
      },
      "",
      "body{font-size:1rem}a:hover{color:red}",
    ],
    [
      {
        preset: [{
          name: "test",
          fn: () => ({
            css: {
              body: { fontSize: "2rem" },
            },
          }),
        }],
      },
      "",
      "body{font-size:2rem}",
    ],
    [
      {
        preset: [{
          name: "test",
          fn: () => ({
            css: {
              body: { fontSize: "2rem" },
            },
          }),
        }, {
          name: "test2",
          fn: () => ({
            css: {
              body: { fontSize: "4rem" },
            },
          }),
        }],
      },
      "",
      "body{font-size:4rem}",
    ],
    [
      {
        css: {
          body: { fontSize: "6rem" },
        },
        preset: [{
          name: "test",
          fn: () => ({
            css: {
              body: { fontSize: "2rem", color: "red" },
            },
          }),
        }, {
          name: "test2",
          fn: () => ({
            css: {
              body: { fontSize: "4rem", fontWeight: 600 },
            },
          }),
        }],
      },
      "",
      "body{color:red;font-size:6rem;font-weight:600}",
    ],
    // Duplicate deletion is not performed.
    [
      {
        css: {
          body: { "font-size": "6rem", fontSize: "4rem" },
        },
      },
      "",
      "body{font-size:6rem;font-size:4rem}",
    ],
  ];
  table.forEach(([config, input, result]) =>
    expect(generate(input, { minify: true, ...config }).css).toBe(result)
  );
});
