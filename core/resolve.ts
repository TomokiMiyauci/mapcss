import {
  Arrayable,
  Either,
  head,
  init,
  isFunction,
  isRegExp,
  isString,
  isUndefined,
  last,
  Left,
  prop,
  propPath,
  Right,
} from "../deps.ts";
import { isDeclaration, isSpecifierDefinition } from "./utils/assert.ts";
import { escapeRegExp } from "./utils/escape.ts";
import type {
  CSSStatement,
  Declaration,
  Specifier,
  SpecifierContext,
  SpecifierDefinition,
  SpecifierMap,
  ThemeContext,
} from "./types.ts";

function firstSplit(
  value: string,
  separator: string,
): undefined | string[] {
  const arr = new RegExp(`(.+?)${separator}(.+)`).exec(value);
  if (!arr) return;

  const [_, ...rest] = arr;

  return rest;
}

function leftSplit(value: string[] | string, separator: string): string[][] {
  const _value = isString(value) ? [value] : value;

  const _last = last(_value);
  if (!_last) return [_value];

  const result = firstSplit(_last, separator);
  if (!result) return [_value];

  return [_value, ...leftSplit([...init(_value), ...result], separator)];
}

class MockRegExpExecArray extends Array<string> {
  index = 0;

  constructor(public input: string = "") {
    super();
  }
}

function wrap<T>(value: T): T extends any[] ? T : T[] {
  return Array.isArray(value) ? value : [value] as any;
}

export function resolveSpecifierMap(
  value: string,
  specifierMap: SpecifierMap,
  context: SpecifierContext,
): Required<CSSStatement>[] | undefined {
  const { separator } = context;
  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const [first, ...rest] = path;
    const _declaration = prop(first, specifierMap);

    if (isUndefined(_declaration)) continue;
    const result = EitherSpec(_declaration).mapLeft(
      execSpecifierDeclaration(new MockRegExpExecArray(), context),
    ).mapRight((specifier) => resolveSpecifier(rest, specifier, context)).map(
      resolveDeclaration(context.token),
    ).unwrap();

    if (isUndefined(result)) continue;
    return wrap(result);
  }
}

function resolveSpecifier(
  path: string[],
  specifier: Specifier,
  context: SpecifierContext,
): Arrayable<Required<CSSStatement>> | undefined {
  const [_, ...rest] = path;
  const first = head(path) ?? "DEFAULT";
  if (Array.isArray(specifier)) {
    const map = new Map(specifier.map(([key, value]) => [String(key), value]));
    const maybeSpec = map.get(first);

    if (!maybeSpec) {
      const filteredSpecifier = specifier.filter(filterRegExp) as [
        RegExp,
        Specifier | SpecifierDefinition,
      ][];
      for (const [regExp, specifierOrDefinition] of filteredSpecifier) {
        const regExpExecArray = regExp.exec(first);
        if (!regExpExecArray) continue;

        const result = EitherSpec(specifierOrDefinition).mapLeft(
          execSpecifierDeclaration(regExpExecArray, context),
        ).mapRight((specifier) => resolveSpecifier(rest, specifier, context))
          .map(
            resolveDeclaration(context.token),
          ).unwrap();
        if (isUndefined(result)) continue;
        return result;
      }
      return;
    }
    return EitherSpec(maybeSpec).mapLeft(
      execSpecifierDeclaration(new MockRegExpExecArray(), context),
    ).mapRight((specifier) => resolveSpecifier(rest, specifier, context)).map(
      resolveDeclaration(context.token),
    )
      .unwrap();
  }
  const _declaration = prop(first, specifier);
  if (isUndefined(_declaration)) return;

  return EitherSpec(_declaration).mapLeft(
    execSpecifierDeclaration(new MockRegExpExecArray(), context),
  ).mapRight((
    specifier,
  ) => resolveSpecifier(rest, specifier, context)).map(
    resolveDeclaration(context.token),
  )
    .unwrap();
}

function filterRegExp(
  [key]: [string | number | RegExp, Specifier | SpecifierDefinition],
): boolean {
  return isRegExp(key);
}

function execSpecifierDeclaration(
  regExpExecArray: RegExpExecArray,
  context: SpecifierContext,
) {
  return (specifierDeclaration: SpecifierDefinition) =>
    isFunction(specifierDeclaration)
      ? specifierDeclaration(regExpExecArray, context)
      : specifierDeclaration;
}

function EitherSpec(
  value: Specifier | SpecifierDefinition,
): Either<SpecifierDefinition, Specifier> {
  if (isSpecifierDefinition(value)) return Left(value);
  return Right(value);
}

function resolveDeclaration(
  selector: string,
) {
  return (
    declaration: Arrayable<Declaration> | Arrayable<CSSStatement> | undefined,
  ) => {
    if (isUndefined(declaration)) return;
    if (Array.isArray(declaration)) {
      return declaration.map((decl) => constructCSSStatement(decl, selector));
    }
    return constructCSSStatement(declaration, selector);
  };
}

function constructCSSStatement(
  value: Declaration | CSSStatement,
  basic: string,
): Required<CSSStatement> {
  if (isDeclaration(value)) {
    const selector = escapeRegExp(basic);
    return {
      declaration: value,
      type: "ruleset",
      selector: { basic: selector ? `.${selector}` : "" },
    };
  }
  if (value.type === "ruleset") {
    const { selector, ...rest } = value;
    const _selector = escapeRegExp(basic);

    return {
      ...rest,
      selector: {
        basic: _selector ? `.${_selector}` : "",
        ...selector,
      },
    };
  }
  if (value.type === "groupAtRule") {
    return {
      ...value,
      children: constructCSSStatement(value.children, basic),
    };
  }
  return value;
}

/** resolve theme via propPath safety */
export function resolveTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: ThemeContext,
): string | undefined {
  const paths = leftSplit(identifier, separator);
  for (const path of paths) {
    const result = propPath([themeRoot, ...path], theme);
    if (isString(result)) {
      return result;
    }
  }
}
