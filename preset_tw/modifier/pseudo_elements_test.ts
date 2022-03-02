import { before } from "./pseudo_elements.ts";
import { createContext, TestCase } from "./_test.ts";

const context = createContext({ modifier: "before" });

export const pseudoElements: TestCase = [
  [{}, {}, before, context],
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
    before,
    context,
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
    before,
    context,
  ],
];
