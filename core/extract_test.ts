import { splitSimple } from "./extract.ts";
import { expect, test } from "../dev_deps.ts";

test("splitSimple", () => {
  expect(splitSimple(`const a = "relative" <div className={a}>hoge</div>`))
    .toEqual(
      ["const", "a", "relative", "<div", "className", "{a}", "hoge</div"],
    );
});
