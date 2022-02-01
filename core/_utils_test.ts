import { expect, test } from "../dev_deps.ts";
import { cssDeclaration, cssDeclarationBlock } from "./_utils.ts";

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
