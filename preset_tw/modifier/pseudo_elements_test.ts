import { content } from "./pseudo_elements.ts";
import { TestCase } from "./_test.ts";
import { createContext, createMatchInfo } from "../../utils/context.ts";

const beforeMatchInfo = createMatchInfo({ id: "before" });
const afterMatchInfo = createMatchInfo({ id: "after" });

export const pseudoElements: TestCase = [
  [{}, {}, content, beforeMatchInfo, createContext()],
  [
    {
      block: {
        display: "block",
      },
    },
    {
      "block::before": {
        display: "block",
        content: "var(--map-content)",
      },
    },
    content,
    beforeMatchInfo,
    createContext(),
  ],
  [
    {
      ".content-\[hello\]": {
        "--map-content": "hello",
        content: "test",
      },
    },
    {
      ".content-\[hello\]::before": {
        "--map-content": "hello",
        content: "var(--map-content)",
      },
    },
    content,
    beforeMatchInfo,
    createContext(),
  ],
  [
    {
      "block::before": {
        display: "block",
      },
    },
    {
      "block::before::after": {
        display: "block",
        content: "var(--map-content)",
      },
    },
    content,
    afterMatchInfo,
    createContext(),
  ],
];
