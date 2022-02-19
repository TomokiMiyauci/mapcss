import { sortBy } from "../deps.ts";
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
        const declarations = sortBy(
          statement.declarations,
          ({ property }) => property,
        );
        return { ...statement, declarations };
      }
      return statement;
    });
  },
};
