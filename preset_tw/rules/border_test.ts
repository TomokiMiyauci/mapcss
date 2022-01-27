import {
  handleBorderWidthDirection,
  handleBorderWidthNumber,
} from "./border.ts";
import { theme } from "../theme/mod.ts";
import { expect, test } from "../../dev_deps.ts";

test("handleBorderWidthDirection", () => {
  expect(handleBorderWidthDirection(["", "u"], { theme })).toBeUndefined();

  const table: [string, string | undefined, Record<PropertyKey, unknown>][] = [
    ["x", undefined, {
      "border-left-width": "1px",
      "border-right-width": "1px",
    }],
    ["y", undefined, {
      "border-top-width": "1px",
      "border-bottom-width": "1px",
    }],
    ["t", undefined, {
      "border-top-width": "1px",
    }],
    ["r", undefined, {
      "border-right-width": "1px",
    }],
    ["b", undefined, {
      "border-bottom-width": "1px",
    }],
    ["l", undefined, {
      "border-left-width": "1px",
    }],
    ["l", "2", {
      "border-left-width": "2px",
    }],
    ["y", "4.5", {
      "border-top-width": "4.5px",
      "border-bottom-width": "4.5px",
    }],
  ];

  table.forEach(([body, length, result]) => {
    const arr = length ? ["", body, length] : ["", body];
    expect(handleBorderWidthDirection(arr, { theme }))
      .toEqual(
        result,
      );
  });
});

test("handleBorderWidthNumber", () => {
  expect(handleBorderWidthNumber(["", "u"], { theme })).toBeUndefined();

  const table: [string, Record<PropertyKey, unknown>][] = [
    ["2", {
      "border-width": "2px",
    }],
    ["2.5", {
      "border-width": "2.5px",
    }],
  ];

  table.forEach(([body, result]) => {
    expect(handleBorderWidthNumber(["", body], { theme }))
      .toEqual(
        result,
      );
  });
});
