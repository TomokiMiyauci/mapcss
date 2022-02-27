import { mapChar } from "./generate.ts";
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
