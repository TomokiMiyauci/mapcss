import {
  Arrayable,
  deepMerge,
  distinctBy,
  head,
  init,
  isFunction,
  isString,
  isUndefined,
  last,
  PartialByKeys,
  prop,
  propPath,
  Root,
  tail,
  toAST,
  wrap,
} from "../deps.ts";
import { isBlockDefinition, isCSSDefinition, isRoot } from "./utils/assert.ts";
import type {
  CSSMap,
  IdentifierContext,
  IdentifierDefinition,
  ModifierContext,
  ModifierMap,
  PreProcessor,
  Preset,
  StaticConfig,
  StaticContext,
  Syntax,
  Theme,
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

function leftSplit(
  value: Arrayable<string>,
  separator: string,
): string[][] {
  const _value = isString(value) ? [value] : value;

  const _last = last(_value);
  if (!_last) return [_value];

  const result = firstSplit(_last, separator);
  if (!result) return [_value];

  return [_value, ...leftSplit([...init(_value), ...result], separator)];
}

export function resolveCSSMap(
  value: Arrayable<string>,
  cssMap: Arrayable<Readonly<CSSMap>>,
  context:
    & Omit<IdentifierContext, "key" | "parentKey" | "path">
    & { parentKey?: string; key?: string },
): Root | undefined {
  for (const map of wrap(cssMap)) {
    const paths = leftSplit(value, context.separator);
    for (const path of paths) {
      const first = head(path) ?? "";
      const rest = tail(path);

      const cssMapContext = makeCSSContext(context, { key: first, path });

      const maybeDefinition = prop(first, map) as
        | IdentifierDefinition
        | undefined ?? prop("*", map);

      const resolve = (
        value: IdentifierDefinition | undefined,
      ): Root | undefined => {
        if (isUndefined(value)) return;

        if (isFunction(value)) {
          return resolve(value(cssMapContext.key, cssMapContext));
        } else if (isCSSDefinition(value)) {
          return toAST(value.value);
        } else if (isRoot(value)) {
          return value;
        } else if (isBlockDefinition(value)) {
          return toAST({
            [context.className]: value,
          });
        } else {
          return resolveCSSMap(rest, value, cssMapContext);
        }
      };

      const result = resolve(maybeDefinition);
      if (isUndefined(result)) continue;
      return result;
    }
  }
}

function makeCSSContext(
  baseContext:
    & Omit<IdentifierContext, "key" | "parentKey" | "path">
    & { parentKey?: string; key?: string },
  { key, path }: { key?: string; path: string[] },
): IdentifierContext {
  const _key = key ? key : baseContext.key ?? "";
  return {
    ...baseContext,
    parentKey: baseContext.key,
    key: _key,
    path,
  };
}

/** resolve theme via propPath safety */
export function resolveTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: Pick<StaticContext, "theme" | "separator">,
): string | undefined {
  const paths = leftSplit(identifier, separator);
  for (const path of paths) {
    const result = propPath([themeRoot, ...path], theme);
    if (isString(result)) {
      return result;
    }
  }
}

/** new version for theme resolver */
export function $resolveTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: Pick<StaticContext, "theme" | "separator">,
): Theme | string | undefined {
  const recursive = (
    path: string[],
    theme: Theme,
  ): Theme | string | undefined => {
    const first = head(path);
    if (isUndefined(first)) return theme;
    const result = prop(first, theme);
    if (isString(result) || isUndefined(result)) return result;
    return recursive(tail(path), result);
  };

  const paths = leftSplit(identifier, separator);
  for (const path of paths) {
    const rootResult = prop(themeRoot, theme);
    if (isUndefined(rootResult)) continue;
    if (isString(rootResult)) return rootResult;
    const result = recursive(path, rootResult);
    if (!isUndefined(result)) {
      return result;
    }
  }
}
function pickByName({ name }: { name: string }): string {
  return name;
}

export function resolvePreProcessor(
  ...postProcessors: PreProcessor[]
): PreProcessor[] {
  return distinctBy(postProcessors, pickByName);
}

export function resolveSyntax(...syntaxes: Syntax[]): Syntax[] {
  return distinctBy(syntaxes, pickByName);
}

export function resolvePreset(
  preset: Readonly<Readonly<Preset>[]>,
  context: Readonly<Omit<StaticContext, "theme">>,
): Omit<StaticConfig, "preset">[] {
  return distinctBy(preset, pickByName).map(({ fn }) => {
    const {
      syntax = [],
      cssMap = {},
      modifierMap = {},
      theme = {},
      preProcess = [],
      postcssPlugin = [],
      css = {},
    } = fn(context);
    return {
      syntax,
      cssMap,
      modifierMap,
      theme,
      preProcess,
      postcssPlugin,
      css,
    };
  });
}

/** resolve config to deep merge */
export function resolveConfig(
  {
    syntax: _syntax = [],
    preset = [],
    cssMap: _cssMap = {},
    theme: _theme = {},
    preProcess: _postProcess = [],
    modifierMap: _modifierMap = {},
    postcssPlugin: _postcssPlugin = [],
    css: _css = {},
  }: Readonly<
    Partial<
      StaticConfig
    >
  >,
  context: Readonly<Omit<StaticContext, "theme">>,
): Omit<StaticConfig, "preset" | "cssMap"> & { cssMaps: CSSMap[] } {
  const _presets = resolvePreset(preset, context);
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
  const syntax = resolveSyntax(
    ..._syntax,
    ..._presets.map(({ syntax }) => syntax).flat(),
  );
  const cssMaps = [..._presets.map(({ cssMap }) => cssMap), _cssMap];

  const preProcess = resolvePreProcessor(
    ..._postProcess,
    ..._presets.map(({ preProcess }) => preProcess).flat(),
  );
  const css = [..._presets.map(({ css }) => css), _css].reduce(
    (acc, cur) => deepMerge(acc, cur),
    {},
  );
  const postcssPlugin = [
    ..._postcssPlugin,
    ..._presets.map(({ postcssPlugin }) => postcssPlugin).flat(),
  ];
  return {
    cssMaps,
    theme,
    modifierMap,
    syntax,
    preProcess,
    css,
    postcssPlugin,
  };
}

export function resolveModifierMap(
  modifier: string | string[],
  modifierMap: ModifierMap,
  parentNode: Root,
  context: PartialByKeys<ModifierContext, "path">,
): Root | undefined {
  const { separator } = context;
  const paths = leftSplit(modifier, separator);

  for (const path of paths) {
    const _head = head(path);
    const first = _head ?? "DEFAULT";
    if (isUndefined(first)) continue;
    if (!context.path) {
      context.path = path;
    }
    const ctx: ModifierContext = context.path
      ? context as ModifierContext
      : { ...context, path };

    const modifier = prop(first, modifierMap);
    if (isUndefined(modifier)) {
      context.path = undefined;
      continue;
    }

    if (isFunction(modifier)) {
      const maybeRoot = modifier(parentNode, ctx);
      context.path = undefined;
      if (isUndefined(maybeRoot)) continue;
      return maybeRoot;
    }
    const rest = tail(path);

    const result = resolveModifierMap(rest, modifier, parentNode, ctx);
    if (result) {
      return result;
    }
    context.path = undefined;
  }
}
