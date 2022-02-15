import { resolveTheme } from "../../core/utils/resolver.ts";
import { Some } from "../../deps.ts";
import { cssMediaRule } from "../../core/utils/format.ts";
import type {
  GlobalModifier,
  GlobalModifierHandler,
  ModifierContext,
} from "./../../core/types.ts";

export function minWidthMediaQuery(value: string): string {
  return cssMediaRule(`min-width: ${value}`);
}

function breakPointHandler(
  order: number,
  context: ModifierContext,
): ReturnType<GlobalModifierHandler> {
  return Some(resolveTheme(context.modifier, "screen", context)).map(
    minWidthMediaQuery,
  ).match({
    some: (atRule) => ({
      atRule,
      order,
    }),
    none: undefined,
  });
}

export const sm: GlobalModifier = {
  type: "global",
  fn: (_, context) => breakPointHandler(1, context),
};

export const md: GlobalModifier = {
  type: "global",
  fn: (_, context) => breakPointHandler(2, context),
};

export const lg: GlobalModifier = {
  type: "global",
  fn: (_, context) => breakPointHandler(3, context),
};

export const xl: GlobalModifier = {
  type: "global",
  fn: (_, context) => breakPointHandler(4, context),
};

export const $2xl: GlobalModifier = {
  type: "global",
  fn: (_, context) => breakPointHandler(5, context),
};
