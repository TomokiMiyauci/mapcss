import {
  AtRule,
  constructCSS,
  isDynamicRule,
  isStaticRule,
  RuleSet,
} from "./_utils.ts";
import { deepMerge } from "../deps.ts";
import type {
  DynamicRule,
  Preset,
  Rule,
  RuleContext,
  StaticRule,
  Theme,
} from "./types.ts";

export interface Config {
  rules: Rule[];
  theme: Theme;
  presets: Preset[];
}

/** Generate CSS Sheet as string */
export function generate(
  { rules = [], presets = [], theme = {} }: Partial<Config>,
  input: Set<string>,
): string {
  const presetsRules = presets.map(({ rules }) => rules);
  const presetsModifiers = presets.map(({ modifiers }) => modifiers);
  const presetsTheme = presets.map(({ theme }) => theme).reduce((acc, cur) => {
    return deepMerge(acc, cur) as Theme;
  }, {} as Theme);
  const _rules = presetsRules.flat(1).concat(rules);
  const _theme = deepMerge(presetsTheme, theme) as Theme;
  const _modifiers = presetsModifiers.flat(1);
  const staticRules = _rules.filter(isStaticRule);
  const dynamicRules = _rules.filter(isDynamicRule);
  const context = { theme: _theme };

  const cssCache = Array.from(input).map((token) => {
    const result = /^(?:(.+):)?(.+)$/.exec(token);
    if (!result) return;
    const [, modifier, matcher] = result as unknown as [
      string,
      string | undefined,
      string,
    ];

    const ruleSet = findRuleSet({
      identifier: matcher,
      staticRules,
      dynamicRules,
    }, context);
    if (!ruleSet) return;
    if (!modifier) return ruleSet;

    const atRules = _modifiers.map(([id, handler]) => {
      if (modifier !== id) return;

      const result = handler(modifier, context);
      if (!result) return;

      const { identifier, rule, selector } = result;

      const atRule: AtRule = {
        identifier,
        rule,
        selector,
        children: ruleSet,
      };

      return atRule;
    }).filter(Boolean) as AtRule[];

    return atRules[0];
  }).filter(Boolean) as (AtRule | RuleSet)[];

  return cssCache.map(constructCSS).join("\n");
}

function findRuleSet(
  { identifier, staticRules, dynamicRules }: {
    identifier: string;
    staticRules: StaticRule[];
    dynamicRules: DynamicRule[];
  },
  context: RuleContext,
): RuleSet | undefined {
  const matchedStaticRule = staticRules.find((rule) => {
    return rule[0] === identifier;
  });

  if (matchedStaticRule) {
    return {
      selector: matchedStaticRule[0],
      declarationBlock: matchedStaticRule[1],
    };
  }

  const matchedDynamicRules = dynamicRules.map(([regex, fn]) => {
    const regExpExecArray = regex.exec(identifier);

    if (!regExpExecArray) return;
    const dynamicResult = fn(
      regExpExecArray,
      context,
    );
    if (dynamicResult) {
      return {
        selector: identifier,
        declarationBlock: dynamicResult,
      };
    }
  }).filter(Boolean) as RuleSet[];

  if (matchedDynamicRules.length) {
    return matchedDynamicRules[0];
  }
}
