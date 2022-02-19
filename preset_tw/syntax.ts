import { Syntax } from "../core/types.ts";

export const twBasicSyntax: Syntax = {
  name: "tw-basic-syntax",
  fn: (
    { token, localModifierNames },
  ) => {
    const regExpExecArray = RegExp(
      `(?:(.+)\:)?(${localModifierNames.join("|")})?(.+)`,
    ).exec(token);
    if (!regExpExecArray) return;
    const [, globalModifier, localModifier, specifier] = regExpExecArray;

    return {
      globalModifiers: (globalModifier as string | undefined)?.split(":") ?? [],
      specifier,
      localModifiers: (localModifier as string | undefined)
        ? [localModifier]
        : undefined,
    };
  },
};
