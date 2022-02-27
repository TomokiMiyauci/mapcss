import { Syntax } from "../core/types.ts";

export const twBasicSyntax: Syntax = {
  name: "tw-basic-syntax",
  fn: (
    token,
  ) => {
    const regExpExecArray = RegExp(
      `(?:(.+)\:)?(!|-)?(.+)`,
    ).exec(token);
    if (!regExpExecArray) return;
    const [, stmtModifier, declModifier, specifier] = regExpExecArray;

    const _stmtModifier = (stmtModifier as string | undefined)?.split(":") ??
      [];
    const _declModifier = (declModifier as string | undefined)
      ? [declModifier]
      : [];

    return {
      specifier,
      modifiers: _stmtModifier.concat(_declModifier),
    };
  },
};
