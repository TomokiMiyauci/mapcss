import { customPropertySet } from "./_utils.ts";
import { stringifyVarFunction } from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

function genVariableSet(variablePrefix: string) {
  const [varShadow, varFnShadow] = customPropertySet(
    "shadow",
    variablePrefix,
  );
  const [varShadowColored] = customPropertySet(
    "shadow-colored",
    variablePrefix,
  );
  const [_, varFnShadowColor] = customPropertySet(
    "shadow-color",
    variablePrefix,
  );
  const [varRingOffsetShadow] = customPropertySet(
    "ring-offset-shadow",
    variablePrefix,
  );
  const [varRingShadow] = customPropertySet(
    "ring-shadow",
    variablePrefix,
  );
  return {
    varShadow,
    varFnShadow,
    varShadowColored,
    varFnShadowColor,
    varRingOffsetShadow,
    varRingShadow,
  };
}

export const shadow: CSSMap = {
  "": (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      [varShadowColored]:
        `0 1px 3px 0 ${varFnShadowColor}, 0 1px 2px -1px ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(`${varRingOffsetShadow},`, "0", "0", "#0000")
      }, ${
        stringifyVarFunction(`${varRingShadow},`, "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  sm: (_, { variablePrefix }) => {
    const {
      varShadow,
      varFnShadow,
      varShadowColored,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      [varShadowColored]: `0 1px 2px 0 ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  md: (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      [varShadowColored]:
        `0 4px 6px -1px ${varFnShadowColor}, 0 2px 4px -2px ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  lg: (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]:
        `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
      [varShadowColored]:
        `0 10px 15px -3px ${varFnShadowColor}, 0 4px 6px -4px ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  xl: (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      [varShadowColored]:
        `0 20px 25px -5px ${varFnShadowColor}, 0 8px 10px -6px ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  "2xl": (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      [varShadowColored]: `0 25px 50px -12px ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  inner: (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varFnShadowColor,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      [varShadowColored]: `inset 0 2px 4px 0 ${varFnShadowColor}`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
  none: (_, { variablePrefix }) => {
    const {
      varShadowColored,
      varFnShadow,
      varShadow,
      varRingOffsetShadow,
      varRingShadow,
    } = genVariableSet(
      variablePrefix,
    );
    return {
      [varShadow]: "0 0 #0000",
      [varShadowColored]: `0 0 #0000`,
      boxShadow: `${
        stringifyVarFunction(varRingOffsetShadow, ",", "0", "0", "#0000")
      }, ${
        stringifyVarFunction(varRingShadow, ",", "0", "0", "#0000")
      }, ${varFnShadow}`,
    };
  },
};
