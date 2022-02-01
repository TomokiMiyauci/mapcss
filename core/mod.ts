import { constructCSS } from "./_utils.ts";
import { resolveMap } from "./utils/resolver.ts";
import type { Config, CSSObject, RuleSet } from "./types.ts";

export interface GenerateResult {
  css: string;
  matched: Set<string>;
  unmatched: Set<string>;
}

function constructRuleSet(selector: string, cssObject: CSSObject): RuleSet {
  return {
    selector,
    declarationBlock: cssObject,
  };
}

/** Generate CSS Sheet as string */
export function generate(
  { mapperMap = {}, theme = {}, separator = "-" }: Partial<Config>,
  input: Set<string>,
): GenerateResult {
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const results = Array.from(input).map((input) => {
    const maybeCSSObject = resolveMap(input, {
      theme,
      mapperMap,
      separator,
    });

    if (!maybeCSSObject) {
      unmatched.add(input);
      return;
    }
    matched.add(input);
    const ruleSet = constructRuleSet(input, maybeCSSObject);
    return constructCSS(ruleSet);
  }).filter(Boolean) as string[];
  return { css: results.join("\n"), matched, unmatched };
}
