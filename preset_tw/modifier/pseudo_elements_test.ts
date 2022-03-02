import { content } from "./pseudo_elements.ts";
import { createContext, TestCase } from "./_test.ts";

const beforeContext = createContext({ modifier: "before" });
const afterContext = createContext({ modifier: "after" });

export const pseudoElements: TestCase = [
  [{}, {}, content, beforeContext],
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
    beforeContext,
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
    beforeContext,
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
    afterContext,
  ],
];
