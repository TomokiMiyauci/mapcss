import { createMedia } from "./at_rule.ts";
import { createContext, TestCase } from "./_test.ts";

const context = createContext();

const mock = {
  block: {
    display: "block",
  },
};

export const atRules: TestCase = [
  [
    mock,
    { "@media (orientation: portrait)": mock },
    createMedia("(orientation: portrait)"),
    context,
  ],
  [
    { "@media (min-width: 640px)": mock },
    { "@media (orientation: portrait)": { "@media (min-width: 640px)": mock } },
    createMedia("(orientation: portrait)"),
    context,
  ],
  [
    { display: "block" },
    { display: "block" },
    createMedia("(orientation: portrait)"),
    context,
  ],
];
