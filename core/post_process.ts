import type { PostProcessor } from "./types.ts";

export const statementOrderProcessor: PostProcessor = {
  name: "statement-order-processor",
  fn: (cssStatements) => {
    return cssStatements.sort((a, b) => {
      const aMax = Math.abs(Math.max(...a.orders));
      const bMax = Math.abs(Math.max(...b.orders));

      if (Number.isFinite(aMax) || Number.isFinite(bMax)) {
        if (!Number.isFinite(aMax)) {
          return -bMax;
        }
        if (!Number.isFinite(bMax)) {
          return aMax;
        }

        return aMax - bMax;
      } else {
        return 0;
      }
    });
  },
};
