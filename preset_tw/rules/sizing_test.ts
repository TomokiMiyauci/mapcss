import { expect, test } from "../../dev_deps.ts";
import {
  handleHeight,
  handleHeightFraction,
  handleHeightNumber,
  handleMaxWidth,
  handleMinWidth,
  resolveWidthString,
} from "./sizing.ts";
import { width } from "../theme/width.ts";
import { theme } from "../theme/mod.ts";

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

test("handleMinWidth", () => {
  expect(handleMinWidth(["", "0"], { theme })).toEqual({ "min-width": "0px" });
  expect(handleMinWidth(["", "full"], { theme })).toEqual({
    "min-width": "100%",
  });
  expect(handleMinWidth(["", "min"], { theme })).toEqual({
    "min-width": "min-content",
  });
  expect(handleMinWidth(["", "max"], { theme })).toEqual({
    "min-width": "max-content",
  });
  expect(handleMinWidth(["", "fit"], { theme })).toEqual({
    "min-width": "fit-content",
  });
});

test("handleMaxWidth", () => {
  expect(handleMaxWidth(["", "0"], { theme })).toEqual({ "max-width": "0rem" });
  expect(handleMaxWidth(["", "none"], { theme })).toEqual({
    "max-width": "none",
  });
  expect(handleMaxWidth(["", "xs"], { theme })).toEqual({
    "max-width": "20rem",
  });
  expect(handleMaxWidth(["", "sm"], { theme })).toEqual({
    "max-width": "24rem",
  });
  expect(handleMaxWidth(["", "md"], { theme })).toEqual({
    "max-width": "28rem",
  });
  expect(handleMaxWidth(["", "lg"], { theme })).toEqual({
    "max-width": "32rem",
  });
  expect(handleMaxWidth(["", "xl"], { theme })).toEqual({
    "max-width": "36rem",
  });
  expect(handleMaxWidth(["", "2xl"], { theme })).toEqual({
    "max-width": "42rem",
  });
  expect(handleMaxWidth(["", "3xl"], { theme })).toEqual({
    "max-width": "48rem",
  });
  expect(handleMaxWidth(["", "4xl"], { theme })).toEqual({
    "max-width": "56rem",
  });
  expect(handleMaxWidth(["", "5xl"], { theme })).toEqual({
    "max-width": "64rem",
  });
  expect(handleMaxWidth(["", "6xl"], { theme })).toEqual({
    "max-width": "72rem",
  });
  expect(handleMaxWidth(["", "7xl"], { theme })).toEqual({
    "max-width": "80rem",
  });
  expect(handleMaxWidth(["", "full"], { theme })).toEqual({
    "max-width": "100%",
  });
  expect(handleMaxWidth(["", "min"], { theme })).toEqual({
    "max-width": "min-content",
  });
  expect(handleMaxWidth(["", "max"], { theme })).toEqual({
    "max-width": "max-content",
  });
  expect(handleMaxWidth(["", "fit"], { theme })).toEqual({
    "max-width": "fit-content",
  });
  expect(handleMaxWidth(["", "prose"], { theme })).toEqual({
    "max-width": "65ch",
  });
  expect(handleMaxWidth(["", "screen-sm"], { theme })).toEqual({
    "max-width": "640px",
  });
  expect(handleMaxWidth(["", "screen-md"], { theme })).toEqual({
    "max-width": "768px",
  });
  expect(handleMaxWidth(["", "screen-lg"], { theme })).toEqual({
    "max-width": "1024px",
  });
  expect(handleMaxWidth(["", "screen-xl"], { theme })).toEqual({
    "max-width": "1280px",
  });
  expect(handleMaxWidth(["", "screen-2xl"], { theme })).toEqual({
    "max-width": "1536px",
  });
});

test("handleHeightNumber", () => {
  expect(handleHeightNumber(["", "0"], { theme })).toEqual({ height: "0px" });
  expect(handleHeightNumber(["", "1"], { theme })).toEqual({
    height: "0.25rem",
  });
  expect(handleHeightNumber(["", "1.0"], { theme })).toEqual({
    height: "0.25rem",
  });
  expect(handleHeightNumber(["", ".5"], { theme })).toEqual({
    height: "0.125rem",
  });
  expect(handleHeightNumber(["", "000"], { theme })).toEqual({
    height: "0px",
  });
});

test("handleHeightFraction", () => {
  expect(handleHeightFraction(["", "1", "2"], { theme })).toEqual({
    height: "50%",
  });
  expect(handleHeightFraction(["", "0", "1"], { theme })).toEqual({
    height: "0%",
  });
  expect(handleHeightFraction(["", "2", "3"], { theme })).toEqual({
    height: "66.66666666666666%",
  });
});

test("handleHeight", () => {
  expect(handleHeight(["", "auto"], { theme })).toEqual({
    height: "auto",
  });
  expect(handleHeight(["", "px"], { theme })).toEqual({
    height: "1px",
  });
  expect(handleHeight(["", "full"], { theme })).toEqual({
    height: "100%",
  });
  expect(handleHeight(["", "screen"], { theme })).toEqual({
    height: "100vh",
  });
  expect(handleHeight(["", "min"], { theme })).toEqual({
    height: "min-content",
  });
  expect(handleHeight(["", "max"], { theme })).toEqual({
    height: "max-content",
  });
  expect(handleHeight(["", "fit"], { theme })).toEqual({
    height: "fit-content",
  });
});
