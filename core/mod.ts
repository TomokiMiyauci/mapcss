import { constructCSS, isDynamicRule, isStaticRule } from "./_utils.ts";
import type { Preset, Rule, StaticRule } from "./types.ts";

export interface Config {
  rules: Rule[];
  presets: Preset[];
}

/** Generate CSS Sheet as string */
export function generate(
  { rules = [], presets = [] }: Partial<Config>,
  input: Set<string>,
): string {
  const presetsRules = presets.map(({ rules }) => rules);

  const _rules = presetsRules.flat(1).concat(rules);
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
      return [token, fn(regExpExecArray)] as StaticRule;
    }).filter(Boolean) as StaticRule[];

    return matchedDynamicRules[0];
  }).filter(Boolean) as StaticRule[];

  return constructCSS(cssCache);
}
