import type { PostProcessor } from "./types.ts";

export const statementOrderProcessor: PostProcessor = {
  name: "statement-order-processor",
  fn: (cssStatements) => {
    return cssStatements.sort((a, b) => {
      const aOrder = a.order;
      const bOrder = b.order;

      if (Number.isFinite(aOrder) || Number.isFinite(bOrder)) {
        if (!Number.isFinite(aOrder)) {
          return -bOrder;
        }
        if (!Number.isFinite(bOrder)) {
          return aOrder;
        }

        return aOrder - bOrder;
      } else {
        return 0;
      }
    });
  },
};

export const declarationOrderProcessor: PostProcessor = {
  name: "declaration-order",
  fn: (cssStatements) => {
    return cssStatements.map((statement) => {
      if (statement.type === "ruleset") {
        const declaration = Object.entries(statement.declaration).sort(
          ([keyA], [keyB]) => {
            if (keyA > keyB) return 1;
            if (keyA < keyB) return -1;
            return 0;
          },
        );
        return { ...statement, declaration: Object.fromEntries(declaration) };
      }
      return statement;
    });
  },
};
