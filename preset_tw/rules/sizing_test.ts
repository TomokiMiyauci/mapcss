import { expect, test } from "../../dev_deps.ts";
import { resolveWidthString } from "./sizing.ts";
import { width } from "../theme/width.ts";

test("resolveWidthString", () => {
  expect(resolveWidthString(["", "auto"], { theme: {} }))
    .toBeUndefined();

  const context = { theme: { width } };
  expect(
    resolveWidthString(["", "px"], context),
  )
    .toEqual({ width: "1px" });
  expect(
    resolveWidthString(["", "auto"], context),
  )
    .toEqual({ width: "auto" });
  expect(
    resolveWidthString(["", "full"], context),
  )
    .toEqual({ width: "100%" });
  expect(
    resolveWidthString(["", "screen"], context),
  )
    .toEqual({ width: "100vw" });
  expect(
    resolveWidthString(["", "min"], context),
  )
    .toEqual({ width: "min-content" });
  expect(
    resolveWidthString(["", "max"], context),
  )
    .toEqual({ width: "max-content" });
  expect(
    resolveWidthString(["", "fit"], context),
  )
    .toEqual({ width: "fit-content" });
});
