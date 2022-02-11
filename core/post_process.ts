import type { PostProcessor } from "./types.ts";

export const statementOrderProcessor: PostProcessor = {
  name: "statement-order-processor",
  fn: (cssStatements) => {
    return cssStatements.sort((a, b) => {
      if (a.atRules.length > b.atRules.length) {
        return 2;
      }
      if (a.atRules.length < b.atRules.length) {
        return -2;
      }
      if (Object.keys(a.cssObject) > Object.keys(b.cssObject)) {
        return -1;
      }
      if (Object.keys(a.cssObject) < Object.keys(b.cssObject)) {
        return 1;
      }
      return 0;
    });
  },
};
