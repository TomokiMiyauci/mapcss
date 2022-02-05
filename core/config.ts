import { deepMerge, distinctBy, union } from "../deps.ts";
import type { Config, Theme } from "./types.ts";

/** resolve config to deep merge */
export function resolveConfig(
  {
    syntaxes: _syntaxes = [],
    presets = [],
    specifierMap = {},
    theme: _theme = {},
    modifierMap: _modifierMap = {},
  }: Readonly<
    Partial<Omit<Config, "separator">>
  >,
): Omit<Config, "separator" | "presets"> {
  const modifierMap = presets.map(({ modifierMap }) => modifierMap).flat()
    .reduce((acc, cur) => {
      return deepMerge(acc, cur);
    }, _modifierMap);
  const theme = presets.map(({ theme }) => theme).flat().reduce(
    (acc, cur) => {
      return deepMerge(acc as any, cur as any) as Theme;
    },
    _theme,
  );

  const _syntax = presets.map(({ syntaxes }) => syntaxes).flat();
  const syntaxes = distinctBy(union(_syntaxes, _syntax), ({ name }) => name);
  const _ = presets.map(({ specifierMap }) => specifierMap).flat();

  return {
    specifierMap: _[0] ?? specifierMap,
    theme,
    modifierMap,
    syntaxes,
  };
}
