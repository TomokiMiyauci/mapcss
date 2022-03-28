// This module is browser compatible.

import { Root } from "../deps.ts";

/** Removes duplicate `decl` nodes in the same `rule`.
 * The criterion for duplication is that `prop` is equal.
 * The node that appears first has priority.
 */
export function removeDuplicatedDecl(root: Readonly<Root>): Root {
  const newRoot = root.clone();

  newRoot.walkRules((rule) => {
    const set = new Set();
    rule.walkDecls((decl) => {
      const prop = decl.prop;
      if (set.has(prop)) {
        decl.remove();
      }
      set.add(prop);
    });
  });
  return newRoot;
}
