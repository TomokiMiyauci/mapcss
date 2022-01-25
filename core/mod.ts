import { constructCSS, isDynamicRule, isStaticRule } from "./_utils.ts";
import { deepMerge } from "../deps.ts";
import type { Preset, Rule, StaticRule, Theme } from "./types.ts";

export interface Config {
  rules: Rule[];
  theme: Partial<Theme>;
  presets: Preset[];
}

/** Generate CSS Sheet as string */
export function generate(
  { rules = [], presets = [], theme = { color: {} } }: Partial<Config>,
  input: Set<string>,
): string {
  const presetsRules = presets.map(({ rules }) => rules);
  const presetsTheme = presets.map(({ theme }) => theme).reduce((acc, cur) => {
    return deepMerge(acc, cur);
  }, {} as Theme);
  const _rules = presetsRules.flat(1).concat(rules);
  const _theme = deepMerge(presetsTheme, theme);
  const staticRules = _rules.filter(isStaticRule);
  const dynamicRules = _rules.filter(isDynamicRule);

  const cssCache = Array.from(input).map((token) => {
    const matchedStaticRule = staticRules.find((rule) => {
      return rule[0] === token;
    });
    if (matchedStaticRule) {
      return matchedStaticRule;
    }

    const matchedDynamicRules = dynamicRules.map(([regex, fn]) => {
      const regExpExecArray = regex.exec(token);

      if (!regExpExecArray) return;
      const dynamicResult = fn(
        regExpExecArray,
        _theme as Theme & Record<string, unknown>,
      );
      if (dynamicResult) {
        return [
          token,
          dynamicResult,
        ];
      }
    }).filter(Boolean) as StaticRule[];

    return matchedDynamicRules[0];
  }).filter(Boolean) as StaticRule[];

  return constructCSS(cssCache);
}
