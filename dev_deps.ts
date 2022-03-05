export {
  any,
  anyArray,
  anyBoolean,
  anyNumber,
  anyOf,
  anyString,
  test,
} from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
import {
  defineExpect,
  equal,
  jestExtendedMatcherMap,
  jestMatcherMap,
  jestModifierMap,
  MatchResult,
} from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
import { isObject, Root, toAST, toObject } from "./deps.ts";
import type { BinaryTree } from "./core/types.ts";

function toEqualJSCSS(
  actual: unknown,
  expect: BinaryTree<string | number>,
): MatchResult {
  if (!(actual instanceof Root) && !isObject(actual)) {
    return {
      pass: false,
      expected: "Expected should be Root or JSCSS Object:",
    };
  }
  const root = actual instanceof Root
    ? actual
    : toAST(actual as Record<any, any>);
  const actualJSCSS = toObject(root);
  const expected = toObject(toAST(expect));

  return {
    pass: equal(actualJSCSS, expected),
    expected,
    resultActual: actualJSCSS,
  };
}

export const expect = defineExpect({
  matcherMap: {
    ...jestMatcherMap,
    ...jestExtendedMatcherMap,
    toEqualJSCSS,
  },
  modifierMap: jestModifierMap,
});

export type ParamReturn<T extends (...args: any[]) => unknown> = [
  ...Parameters<T>,
  ReturnType<T>,
];
