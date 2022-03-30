import { generate, mapChar } from "./generate.ts";
import { Config } from "./types.ts";
import { expect, test } from "../dev_deps.ts";
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
  const table: [Config, string, string][] = [
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
      "body{font-size:2rem}body{font-size:4rem}",
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
      "body{color:red;font-size:2rem}body{font-size:4rem;font-weight:600}body{font-size:6rem}",
    ],
    [
      {
        css: [{
          body: { fontSize: "5" },
        }, { body: { fontSize: "6" } }],
        preset: [{
          name: "test",
          fn: () => ({
            css: [{
              body: { fontSize: "1" },
            }, { body: { fontSize: "2" } }],
          }),
        }, {
          name: "test2",
          fn: () => ({
            css: [{
              body: { fontSize: "3" },
            }, {
              body: { fontSize: "4" },
            }],
          }),
        }],
      },
      "",
      "body{font-size:1}body{font-size:2}body{font-size:3}body{font-size:4}body{font-size:5}body{font-size:6}",
    ],
  ];
  table.forEach(([config, input, result]) =>
    expect(generate(input, { minify: true, ...config }).css).toBe(result)
  );
});

Deno.test("injected CSS should be placed first", () => {
  expect(
    generate("block", {
      cssMap: {
        block: { display: "block", "--map": "test" },
      },
      css: {
        body: { color: "red" },
      },
      minify: true,
    }).css,
  ).toBe("body{color:red}.block{--map:test;display:block}");
});
