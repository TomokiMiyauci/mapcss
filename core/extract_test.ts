import { splitBySpace } from "./extract.ts";
import { expect, test } from "../dev_deps.ts";

test("splitBySpace", () => {
  expect(splitBySpace(`const a = "relative" <div className={a}>hoge</div>`))
    .toEqual(
      ["const", "a", "relative", "<div", "className", "{a}", "hoge</div"],
    );
});