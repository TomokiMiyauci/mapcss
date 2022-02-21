import {
  Arrayable,
  deepMerge,
  distinctBy,
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
  Some,
  sortBy,
} from "../deps.ts";
import { isDeclaration, isSpecifierDefinition } from "./utils/assert.ts";
import { escapeRegExp } from "./utils/escape.ts";
import { propertyValue } from "./utils/format.ts";
import type {
  Config,
  CSSStatement,
  Declaration,
  ModifierContext,
  ModifierMap,
  PostProcessor,
  Specifier,
  SpecifierContext,
  SpecifierCSSStatement,
  SpecifierDefinition,
  SpecifierMap,
  Syntax,
  Theme,
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
): CSSStatement[] | undefined {
  const { separator } = context;
  const classSelector = context.token ? `.${escapeRegExp(context.token)}` : "";

  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const [first, ...rest] = path;
    const _declaration = prop(first, specifierMap);

    if (isUndefined(_declaration)) continue;
    const resolved = EitherSpec(_declaration).mapLeft(
      execSpecifierDeclaration(new MockRegExpExecArray(), context),
    ).mapRight((specifier) => resolveSpecifier(rest, specifier, context))
      .unwrap();

    const result = Some(resolved).map(wrap).map((cssStatement) =>
      cssStatement.map((definition) =>
        EitherDefinition(definition).mapLeft(declaration2Statement).map((
          v,
        ) => toCSSStatement(v, classSelector))
          .unwrap()
      )
    ).match({
      some: (v) => v,
      none: undefined,
    });

    if (isUndefined(result)) continue;
    return result;
  }
}

function resolveSpecifier(
  path: string[],
  specifier: Specifier,
  context: SpecifierContext,
): Arrayable<SpecifierCSSStatement> | Arrayable<Declaration> | undefined {
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
          .unwrap();
        if (isUndefined(result)) continue;
        return result;
      }
      return;
    }
    return EitherSpec(maybeSpec).mapLeft(
      execSpecifierDeclaration(new MockRegExpExecArray(), context),
    ).mapRight((specifier) => resolveSpecifier(rest, specifier, context))
      .unwrap();
  }
  const _declaration = prop(first, specifier);
  if (isUndefined(_declaration)) return;

  return EitherSpec(_declaration).mapLeft(
    execSpecifierDeclaration(new MockRegExpExecArray(), context),
  ).mapRight((
    specifier,
  ) => resolveSpecifier(rest, specifier, context))
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
  return (
    specifierDeclaration: SpecifierDefinition,
  ): Arrayable<Declaration> | Arrayable<SpecifierCSSStatement> | undefined =>
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

function EitherDefinition(
  value: Declaration | SpecifierCSSStatement,
): Either<Declaration, SpecifierCSSStatement> {
  if (isDeclaration(value)) return Left(value);
  return Right(value);
}

function toCSSStatement(
  definition: SpecifierCSSStatement,
  classSelector: string,
): CSSStatement {
  if (definition.type === "ruleset") {
    const { selector, order = 0, declaration, ...rest } = definition;
    const _ = selector?.(classSelector) ?? classSelector;
    return {
      order,
      selector: _,
      declarations: Object.entries(declaration).map(propertyValue),
      ...rest,
    };
  }
  const { children, order = 0, ...rest } = definition;
  return { order, ...rest, children: toCSSStatement(children, classSelector) };
}

function declaration2Statement(
  declaration: Declaration,
): SpecifierCSSStatement {
  return {
    type: "ruleset",
    declaration,
  };
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

function pickByName({ name }: { name: string }): string {
  return name;
}

export function resolvePostProcessor(
  ...postProcessors: PostProcessor[]
): PostProcessor[] {
  const processor = distinctBy(postProcessors, pickByName);
  return sortBy(processor, ({ order }) => order ?? 0);
}

export function resolveSyntax(...syntaxes: Syntax[]): Syntax[] {
  return distinctBy(syntaxes, pickByName);
}

/** resolve config to deep merge */
export function resolveConfig(
  {
    syntaxes: _syntaxes = [],
    presets = [],
    specifierMap: _specifierMap = {},
    theme: _theme = {},
    postProcess: _postProcess = [],
    modifierMap: _modifierMap = {},
  }: Readonly<
    Partial<
      Pick<
        Config,
        | "specifierMap"
        | "modifierMap"
        | "theme"
        | "presets"
        | "syntaxes"
        | "postProcess"
      >
    >
  >,
): Pick<
  Config,
  "specifierMap" | "modifierMap" | "theme" | "syntaxes" | "postProcess"
> {
  const _presets = distinctBy(presets, pickByName);
  const modifierMap = _presets.map(({ modifierMap }) => modifierMap)
    .reduce((acc, cur) => {
      return deepMerge(acc, cur);
    }, _modifierMap);
  const theme = _presets.map(({ theme }) => theme).reduce(
    (acc, cur) => {
      return deepMerge(acc as any, cur as any) as Theme;
    },
    _theme,
  );
  const syntaxes = resolveSyntax(
    ..._syntaxes,
    ..._presets.map(({ syntaxes }) => syntaxes).flat(),
  );
  const specifierMap = _presets.map(({ specifierMap }) => specifierMap).reduce(
    (acc, cur) => {
      return deepMerge(acc, cur);
    },
    _specifierMap,
  );
  const postProcess = resolvePostProcessor(
    ..._postProcess,
    ..._presets.map(({ postProcessor }) => postProcessor).flat(),
  );

  return {
    specifierMap,
    theme,
    modifierMap,
    syntaxes,
    postProcess,
  };
}

export function resolveModifierMap(
  modifier: string,
  modifierMap: ModifierMap,
  cssStatements: CSSStatement,
  context: Omit<ModifierContext, "path">,
): CSSStatement | undefined {
  const { separator } = context;
  const paths = leftSplit(modifier, separator);

  for (const path of paths) {
    const ctx = { ...context, path };
    const [first, second] = path;
    const modifier = prop(first, modifierMap);

    if (isUndefined(modifier)) continue;
    if (isFunction(modifier)) {
      return modifier(cssStatements, ctx);
    }
    const modifierDefinition = prop(second, modifier);
    return modifierDefinition?.(cssStatements, ctx);
  }
}
