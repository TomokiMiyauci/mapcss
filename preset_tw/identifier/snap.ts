import { customProperty, varFn } from "../../core/utils/format.ts";
import type { RecordIdentifier } from "../../core/types.ts";

export const snap: RecordIdentifier = {
  start: { "scroll-snap-align": "start" },
  end: { "scroll-snap-align": "end" },
  center: { "scroll-snap-align": "center" },
  align: {
    none: { "scroll-snap-align": "none" },
  },
  normal: { "scroll-snap-stop": "normal" },
  always: { "scroll-snap-stop": "always" },
  none: { "scroll-snap-type": "none" },
  x: (_, { variablePrefix }) => ({
    "scroll-snap-type": `x ${
      varFn(customProperty("scroll-snap-strictness", variablePrefix))
    }`,
  }),
  y: (_, { variablePrefix }) => ({
    "scroll-snap-type": `y ${
      varFn(customProperty("scroll-snap-strictness", variablePrefix))
    }`,
  }),
  both: (_, { variablePrefix }) => ({
    "scroll-snap-type": `both ${
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
