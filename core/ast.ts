import { Declaration, Root } from "./deps.ts";

/** filter `decl` node */
export function filterDeclaration(root: Readonly<Root>): Root {
  const newRoot = root.clone();
  const cache: Declaration[] = [];
  newRoot.walkDecls((node) => {
    cache.push(node);
  });

  return new Root({ nodes: cache });
}
