import { isUndefined } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { reAll, reNumeric, reSlashNumber } from "../../core/utils/regexp.ts";
import { associatePx, associateRGBA, pxBy } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

const BORDER_WIDTH = "border-width";

export const border: Specifier = [
  ["DEFAULT", { [BORDER_WIDTH]: "1px" }],
  ["solid", { "border-style": "solid" }],
  ["dashed", { "border-style": "dashed" }],
  ["dotted", { "border-style": "dotted" }],
  ["double", { "border-style": "double" }],
  ["hidden", { "border-style": "hidden" }],
  ["none", { "border-style": "none" }],
  ["collapse", { "border-collapse": "collapse" }],
  ["separate", { "border-collapse": "separate" }],
  ["x", [["DEFAULT", {
    "border-left-width": "1px",
    "border-right-width": "1px",
  }], [
    reNumeric,
    ([, numeric]) =>
      associatePx(numeric, ["border-left-width", "border-right-width"]),
  ], [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(
      color,
      ["border-left-color", "border-right-color"],
      alpha,
    );
  }], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-left-color", "border-right-color"]);
  }]]],
  ["y", [["DEFAULT", {
    "border-top-width": "1px",
    "border-bottom-width": "1px",
  }], [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(
      color,
      ["border-top-color", "border-bottom-color"],
      alpha,
    );
  }], [
    reNumeric,
    ([, numeric]) =>
      associatePx(numeric, ["border-top-width", "border-bottom-width"]),
  ], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-top-color", "border-bottom-color"]);
  }]]],
  ["t", [["DEFAULT", { "border-top-width": "1px" }], [
    reSlashNumber,
    ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return associateRGBA(
        color,
        ["border-top-color", "border-top-color"],
        alpha,
      );
    },
  ], [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["border-top-width"]),
  ], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-top-color"]);
  }]]],
  ["r", [["DEFAULT", { "border-right-width": "1px" }], [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["border-right-width"]),
  ], [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(
      color,
      ["border-right-color"],
      alpha,
    );
  }], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-right-color"]);
  }]]],
  ["b", [["DEFAULT", { "border-bottom-width": "1px" }], [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["border-bottom-width"]),
  ], [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(
      color,
      ["border-bottom-color"],
      alpha,
    );
  }], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-bottom-color"]);
  }]]],
  ["l", [["DEFAULT", { "border-left-width": "1px" }], [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["border-left-width"]),
  ], [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(
      color,
      ["border-left-color"],
      alpha,
    );
  }], [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-left-color"]);
  }]]],
  [
    reNumeric,
    ([, numeric]) => pxBy(numeric, (number) => ({ [BORDER_WIDTH]: number })),
  ],
  [reSlashNumber, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return associateRGBA(color, ["border-color"], alpha);
  }],
  [reAll, ([body], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return associateRGBA(color, ["border-color"]);
  }],
];
