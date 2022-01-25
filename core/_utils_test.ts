import { expect, test } from "../dev_deps.ts";
import { cssDeclaration, cssDeclarationBlock, isRegExp } from "./_utils.ts";

test("isRegExp", () => {
  expect(isRegExp(/a/)).toBe(true);
  expect(isRegExp("a")).toBe(false);
});

test("cssDeclaration", () => {
  expect(cssDeclaration({ property: "display", value: "block" })).toBe(
    "display:block;",
  );
  expect(
    cssDeclaration({ property: "display", value: "block" }, {
      middleSeparator: "-",
    }),
  ).toBe(
    "display-block;",
  );
});

test("cssDeclarationBlock", () => {
  expect(cssDeclarationBlock({ display: "block", position: "absolute" })).toBe(
    "{display:block;position:absolute;}",
  );
});
