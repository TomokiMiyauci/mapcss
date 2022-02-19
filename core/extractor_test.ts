import { splitCode } from "./extractor.ts";
import { expect, test } from "../dev_deps.ts";

test("splitCode", () => {
  expect(splitCode(`const a = "relative" <div className={a}>hoge</div>`))
    .toEqual(
      ["const", "a", "relative", "<div", "className", "{a}", "hoge</div"],
    );
});
