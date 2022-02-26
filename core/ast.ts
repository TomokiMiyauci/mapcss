import {
  AtRule,
  chain,
  ChildNode,
  Declaration,
  Either,
  isNumber,
  isString,
  Left,
  Right,
  Rule,
} from "../deps.ts";
import type { BinaryTree } from "./types.ts";

const IMPORTANT = /\s*!important\s*$/i;

function hyphenCase(value: string): string {
  return value.replace(/([A-Z])/g, "-$1");
}
function hyphenWithMs(value: string): string {
  return value.replace(/^ms-/, "-ms-");
}

function dashify(value: string): string {
  return chain(value).map(hyphenCase).map(hyphenWithMs).unwrap().toLowerCase();
}

function decl(name: string, value: string): Declaration {
  if (!name.startsWith("--")) {
    name = dashify(name);
  }

  const _value = IMPORTANT.test(value)
    ? (() => {
      const _value = value.replace(IMPORTANT, "");
      return { value: _value, important: true };
    })()
    : { value };

  return new Declaration({ prop: name, ..._value });
}

function atRule(
  name: string,
  value: BinaryTree<string | number> | string | number,
  params?: string,
): AtRule {
  const atRule = new AtRule({ name, params });
  if (typeof value === "object") {
    return atRule.append(astify(value));
  }
  return atRule;
}

function treatTree(
  mayBeLeaf: string | number | BinaryTree<string | number>,
): Either<string | number, BinaryTree<string | number>> {
  if (isString(mayBeLeaf) || isNumber(mayBeLeaf)) return Left(mayBeLeaf);
  return Right(mayBeLeaf);
}

/** JavaScript Object to postcss AST
 * ```ts
 * import { astify } from "https://deno.land/x/mapcss@$VERSION/core/ast.ts"
 * const css = {
 *    h1: { display: "block" },
 *    "h2, h3": { color: "red" },
 *    "@media (min-width 640px)": {
 *      ".block": { display: "block" }
 *    }
 * }
 * astify(css)
 * ```
 */
export function astify<
  T extends BinaryTree<string | number> = BinaryTree<string | number>,
>(
  obj: T,
): ChildNode[] {
  return Object.entries(obj).map(([prop, maybeNestedObject]) => {
    if (prop.charAt(0) === "@") {
      const parts = prop.match(/@(\S+)(?:\s+([\W\w]*)\s*)?/);
      if (!parts) return;
      const [_, name, params] = parts;
      return atRule(name, maybeNestedObject, params);
    }

    return treatTree(maybeNestedObject).mapLeft((value) =>
      decl(prop, value.toString())
    )
      .mapRight((nestedObject) =>
        new Rule({
          selector: prop,
          nodes: astify(nestedObject),
        })
      ).unwrap();
  }).filter(Boolean) as ChildNode[];
}
