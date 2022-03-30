// This module is browser compatible.

import { postcss, Root } from "./deps.ts";
import { generate, Output } from "./generate.ts";
import type { StaticConfig, StaticContext } from "./types.ts";

// TODO(miyauci): define generic config types
type Config = Partial<StaticConfig & StaticContext>;

export function transform(input: string, config: Readonly<Config>) {
  const ast = postcss().process(input).root;

  return applyDirective(ast.clone(), (input) => {
    return generate(input.split(" "), config);
  });
}

export function applyDirective(
  ast: Root,
  map: (input: string) => Output,
): Output {
  let matched = new Set<string>();
  let unmatched = new Set<string>();
  ast.walkAtRules("apply", (root) => {
    const { ast, matched: _matched, unmatched: _unmatched } = map(root.params);
    matched = _matched;
    unmatched = _unmatched;

    if (root.parent?.type === "rule") {
      const visit = new Root();
      ast.walkDecls((decl) => {
        visit.append(decl);
      });

      root.parent?.append(visit);
    }

    root.remove();
  });

  return {
    ast,
    get css(): string {
      return ast.toString();
    },
    matched,
    unmatched,
  };
}
