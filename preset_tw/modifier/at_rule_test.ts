import { createMedia } from "./at_rule.ts";
import { TestCase } from "./_test.ts";
import { createContext, createMatchInfo } from "../../utils/context.ts";

const context = createContext();
const matchInfo = createMatchInfo();

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
    matchInfo,
    context,
  ],
  [
    { "@media (min-width: 640px)": mock },
    { "@media (orientation: portrait)": { "@media (min-width: 640px)": mock } },
    createMedia("(orientation: portrait)"),
    matchInfo,
    context,
  ],
  [
    { display: "block" },
    { display: "block" },
    createMedia("(orientation: portrait)"),
    matchInfo,
    context,
  ],
];
