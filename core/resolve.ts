import {
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
  Root,
  Rule,
  sortBy,
  tail,
} from "../deps.ts";
import { astify } from "./ast.ts";
import { isCSSDefinition, isCSSObject } from "./utils/assert.ts";
import { escapeRegExp } from "./utils/escape.ts";
import type {
  Config,
  CSSObject,
  ModifierContext,
  ModifierMap,
  PostProcessor,
  Specifier,
  SpecifierContext,
  SpecifierHandler,
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
  context: Omit<SpecifierContext, "className" | "key" | "path">,
): Root | undefined {
  const className = `.${escapeRegExp(context.token)}`;
  const paths = leftSplit(value, context.separator);

  for (const path of paths) {
    const first = head(path);
    const rest = tail(path);
    if (isUndefined(first)) continue;

    const _BlockDefinition = prop(first, specifierMap);

    if (isUndefined(_BlockDefinition)) continue;
    const specifierContext: SpecifierContext = {
      ...context,
      className,
      key: first,
      path,
    };
    const applySpecifier = (specifier: Specifier) =>
      resolveSpecifier(rest, specifier, specifierContext);

    const resolved = EitherSpec(_BlockDefinition).mapLeft((cssObject) => {
      return handleCSSObject(cssObject, className);
    }).mapRight(applySpecifier).unwrap();

    if (isUndefined(resolved)) continue;

    return resolved;
  }
}

function resolveSpecifier(
  path: string[],
  specifier: Specifier,
  context: SpecifierContext,
): Root | undefined {
  const rest = tail(path);
  const applySpecifier = (specifier: Specifier) =>
    resolveSpecifier(rest, specifier, context);

  const _head = head(path);
  if (isString(_head)) {
    context.key = _head;
  }
  const first = _head ?? "DEFAULT";
  if (Array.isArray(specifier)) {
    const map = new Map(specifier.map(([key, value]) => [String(key), value]));
    const maybeSpec = map.get(first);

    if (!maybeSpec) {
      const filteredSpecifier = specifier.filter(filterRegExp) as [
        RegExp,
        Specifier | CSSObject | SpecifierHandler,
      ][];
      for (const [regExp, specifierOrDefinition] of filteredSpecifier) {
        const regExpExecArray = regExp.exec(first);
        if (!regExpExecArray) continue;

        const result = eitherSpecifier(specifierOrDefinition).mapLeft(
          eitherHandler,
        ).mapLeft((e) => {
          const maybeCSSObjet = e.mapRight((fn) => fn(regExpExecArray, context))
            .unwrap();
          if (!maybeCSSObjet) return;
          return handleCSSObject(maybeCSSObjet, context.className);
        })
          .mapRight(applySpecifier).unwrap();

        if (isUndefined(result)) continue;
        return result;
      }

      return;
    }

    return eitherSpecifier(maybeSpec).mapLeft(eitherHandler).mapLeft((e) => {
      const maybeCSSObjet = e.mapRight((fn) =>
        fn(new MockRegExpExecArray(), context)
      ).unwrap();
      if (!maybeCSSObjet) return;

      return handleCSSObject(maybeCSSObjet, context.className);
    })
      .mapRight(applySpecifier).unwrap();
  }

  const _BlockDefinition = prop(first, specifier);
  if (isUndefined(_BlockDefinition)) return;

  return eitherSpecifier(_BlockDefinition).mapLeft(eitherHandler).mapLeft(
    (e) => {
      const maybeCSSObjet = e.mapRight((fn) =>
        fn(new MockRegExpExecArray(), context)
      ).unwrap();
      if (!maybeCSSObjet) return;
      return handleCSSObject(maybeCSSObjet, context.className);
    },
  )
    .mapRight(applySpecifier).unwrap();
}

function filterRegExp(
  [key]: [string | number | RegExp, Specifier | CSSObject | SpecifierHandler],
): boolean {
  return isRegExp(key);
}

function EitherSpec(
  value: Specifier | CSSObject,
): Either<CSSObject, Specifier> {
  if (isCSSObject(value)) return Left(value);
  return Right(value);
}

function eitherSpecifier(
  value: CSSObject | SpecifierHandler | Specifier,
): Either<CSSObject | SpecifierHandler, Specifier> {
  return isFunction(value) || isCSSObject(value) ? Left(value) : Right(value);
}

function eitherHandler(
  value: CSSObject | SpecifierHandler,
): Either<CSSObject, SpecifierHandler> {
  return isFunction(value) ? Right(value) : Left(value);
}

function handleCSSObject(cssObject: CSSObject, selector: string): Root {
  if (cssObject instanceof Root) {
    return cssObject;
  } else if (isCSSDefinition(cssObject)) {
    return new Root({ nodes: astify(cssObject.value) });
  } else {
    return new Root({
      nodes: [new Rule({ selector, nodes: astify(cssObject) })],
    });
  }
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
  parentNode: Root,
  context: Omit<ModifierContext, "path">,
): Root | undefined {
  const { separator } = context;
  const paths = leftSplit(modifier, separator);

  for (const path of paths) {
    const ctx = { ...context, path };
    const [first, second] = path;
    const modifier = prop(first, modifierMap);

    if (isUndefined(modifier)) continue;
    if (isFunction(modifier)) {
      return modifier(parentNode, ctx);
    }
    const modifierDefinition = prop(second, modifier);
    return modifierDefinition?.(parentNode, ctx);
  }
}
