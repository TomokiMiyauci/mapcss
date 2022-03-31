// This module is browser compatible.

import { AtRule, postcss, Root } from "./deps.ts";
import { generate } from "./generate.ts";
import { applyExtractor } from "./extract.ts";
import { OPTION } from "./constant.ts";
import type { Config, Option, Output } from "./types.ts";

/** Transform input of CSS using MapCSS */
export function transform(
  input: string,
  config: Readonly<Config>,
  option: Readonly<Option> = OPTION,
): Promise<Output> {
  const ast = postcss().process(input).root;

  return applyDirective(ast.clone(), (input) => {
    const tokens = applyExtractor(input, config.extractor);
    return generate(tokens, config, option);
  });
}

export async function applyDirective(
  ast: Root,
  map: (input: string) => Promise<Output>,
): Promise<Output> {
  let matched = new Set<string>();
  let unmatched = new Set<string>();

  const atRules: AtRule[] = [];

  // collect @apply atRule because walk traverser is sync only
  ast.walkAtRules("apply", (atRule) => {
    atRules.push(atRule);
  });

  await Promise.all(atRules.map(async (root) => {
    const { ast, matched: _matched, unmatched: _unmatched } = await map(
      root.params,
    );
    matched = mergeSet(matched, _matched);
    unmatched = mergeSet(unmatched, _unmatched);

    if (root.parent?.type === "rule") {
      const visit = new Root();
      ast.walkDecls((decl) => {
        visit.append(decl);
      });

      root.parent?.append(visit);
    }

    root.remove();
  }));

  return {
    ast,
    get css(): string {
      return ast.toString();
    },
    matched,
    unmatched,
  };
}

function mergeSet<T>(a: Set<T>, b: Set<T>): Set<T> {
  b.forEach((value) => {
    a.add(value);
  });
  return a;
}
