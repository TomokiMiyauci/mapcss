import { customProperty, varFn } from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

export const snap: CSSMap = {
  start: { scrollSnapAlign: "start" },
  end: { scrollSnapAlign: "end" },
  center: { scrollSnapAlign: "center" },
  align: {
    none: { scrollSnapAlign: "none" },
  },
  normal: { scrollSnapStop: "normal" },
  always: { scrollSnapStop: "always" },
  none: { scrollSnapType: "none" },
  x: (_, { variablePrefix }) => ({
    scrollSnapType: `x ${
      varFn(customProperty("scroll-snap-strictness", variablePrefix))
    }`,
  }),
  y: (_, { variablePrefix }) => ({
    scrollSnapType: `y ${
      varFn(customProperty("scroll-snap-strictness", variablePrefix))
    }`,
  }),
  both: (_, { variablePrefix }) => ({
    scrollSnapType: `both ${
      varFn(customProperty("scroll-snap-strictness", variablePrefix))
    }`,
  }),
  mandatory: (_, { variablePrefix }) => ({
    [customProperty("scroll-snap-strictness", variablePrefix)]: "mandatory",
  }),
  proximity: (_, { variablePrefix }) => ({
    [customProperty("scroll-snap-strictness", variablePrefix)]: "proximity",
  }),
};
