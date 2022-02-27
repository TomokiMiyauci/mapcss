import {
  AtRule,
  ChildNode,
  Declaration,
  Either,
  isNumber,
  isString,
  Left,
  Right,
  Root,
  Rule,
} from "../deps.ts";
import type { BinaryTree } from "./types.ts";

const IMPORTANT = /\s*!important\s*$/i;

function hyphenCase(value: string): string {
  return value.replace(/([A-Z])/g, "-$1");
}

function dashify(value: string): string {
  return hyphenCase(value).toLocaleLowerCase();
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

function isAtRule(value: string): boolean {
  return value.charAt(0) === "@";
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
export function astify(
  object: BinaryTree<string | number>,
): Root {
  const nodes = Object.entries(object).map(([prop, maybeNestedObject]) => {
    if (isAtRule(prop)) {
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
          nodes: astify(nestedObject).nodes,
        })
      ).unwrap();
  }).filter(Boolean) as ChildNode[];
  return new Root({ nodes });
}

/** postcss AST to JavaScript Object */
export function objectify(
  ast: { nodes: ChildNode[] },
): BinaryTree<string | number> {
  return ast.nodes.reduce((acc, cur) => {
    if (cur.type === "atrule") {
      const withParams = cur.params ? ` ${cur.params}` : "";
      const atRule = `@${cur.name}${withParams}`;
      return { ...acc, [atRule]: objectify(cur) };
    }
    if (cur.type === "rule") {
      return { ...acc, [cur.selector]: objectify(cur) };
    }
    if (cur.type === "decl") {
      const prop = propCamelCase(cur.prop);
      const value = constructProperty(cur.value, cur.important);
      return { ...acc, [prop]: value };
    }
    return acc;
  }, {});
}

export function constructProperty(
  value: string,
  important: boolean,
): string | number {
  if (important) {
    return `${value} !important`;
  }
  // Convert only numbers without a unit to type `number`.
  if (/^[\d.\s]+$/.test(value)) {
    const number = Number.parseFloat(value);
    return Number.isFinite(number) ? number : value;
  }

  return value;
}

export function propCamelCase(prop: string): string {
  // if custom property, just return
  if (prop.startsWith("--")) return prop;

  return prop.toLowerCase().replace(
    /-(\w|$)/g,
    (_, char) => char.toUpperCase(),
  );
}
