import {
  Arrayable,
  deepMerge,
  distinctBy,
  head,
  init,
  isFunction,
  isLength0,
  isString,
  isUndefined,
  last,
  prop,
  propPath,
  Root,
  tail,
  wrap,
} from "./deps.ts";
import {
  isCSSDefinition,
  isCSSObject,
  isDeclBlockDefinition,
} from "./utils/assert.ts";
import type {
  CSS,
  CSSMap,
  CSSObject,
  IdentifierDefinition,
  MatchInfo,
  ModifierDefinition,
  ModifierMap,
  PreProcessor,
  Preset,
  RuntimeContext,
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
  value: string,
  cssMap: Arrayable<Readonly<CSSMap>>,
  context: Readonly<StaticContext & RuntimeContext>,
): CSS | undefined {
  const _resolve = (
    path: Arrayable<string>,
    cssMap: Arrayable<Readonly<CSSMap>>,
  ): CSS | undefined => {
    for (const map of wrap(cssMap)) {
      const paths = leftSplit(path, context.separator);
      for (const path of paths) {
        const first = head(path);
        const matchInfo: MatchInfo = {
          fullPath: value,
          path,
          id: first ?? "",
          parentId: first,
        };

        const maybeDefinition = prop(first ?? "", map) as
          | IdentifierDefinition
          | undefined ?? prop("*", map);

        const resolve = (
          value: IdentifierDefinition | undefined,
        ): CSS | undefined => {
          if (isUndefined(value)) return;

          if (isFunction(value)) {
            return resolve(value(matchInfo, context));
          }
          const rest = tail(path);

          if (isLength0(rest)) {
            if (isCSSObject(value)) {
              return constructCSS(value, context.className);
            }

            return _resolve("", value);
          } else {
            if (!isCSSObject(value)) {
              return _resolve(rest, value);
            }
          }
        };

        const result = resolve(maybeDefinition);
        if (isUndefined(result)) continue;
        return result;
      }
    }
  };

  return _resolve(value, cssMap);
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
): Omit<StaticConfig, "preset" | "cssMap" | "modifierMap" | "css"> & {
  cssMaps: CSSMap[];
  modifierMaps: ModifierMap[];
  cssList: CSS[];
} {
  const _presets = resolvePreset(preset, context);
  const modifierMaps = [
    ..._presets.map(({ modifierMap }) => modifierMap),
    _modifierMap,
  ];
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
  const cssList = [
    ..._presets.map(({ css }) => wrap(css)).flat(),
    ...wrap(_css),
  ];
  const postcssPlugin = [
    ..._postcssPlugin,
    ..._presets.map(({ postcssPlugin }) => postcssPlugin).flat(),
  ];
  return {
    cssMaps,
    theme,
    modifierMaps,
    syntax,
    preProcess,
    cssList,
    postcssPlugin,
  };
}

export function resolveModifierMap(
  fullPath: string,
  modifierMap: Arrayable<Readonly<ModifierMap>>,
  parentNode: Readonly<Root>,
  context: Readonly<StaticContext & RuntimeContext>,
): Root | undefined {
  const _resolve = (
    path: Arrayable<string>,
    modifierMap: Arrayable<Readonly<ModifierMap>>,
  ): Root | undefined => {
    for (const map of wrap(modifierMap)) {
      const paths = leftSplit(path, context.separator);

      for (const path of paths) {
        const _head = head(path);
        const matchInfo: MatchInfo = {
          id: _head ?? "",
          parentId: _head,
          fullPath,
          path,
        };

        const modifier = prop(_head ?? "", map) as
          | ModifierDefinition
          | undefined;
        if (isUndefined(modifier)) continue;

        if (isFunction(modifier)) {
          const maybeRoot = modifier(parentNode, matchInfo, context);
          if (isUndefined(maybeRoot)) continue;
          return maybeRoot;
        }
        const rest = tail(path);

        const result = _resolve(rest, modifier);
        if (result) {
          return result;
        }
      }
    }
  };
  return _resolve(fullPath, modifierMap);
}

export function constructCSS(cssObject: CSSObject, className: string): CSS {
  if (isCSSDefinition(cssObject)) {
    return cssObject.value;
  } else if (isDeclBlockDefinition(cssObject)) {
    return { [className]: cssObject.value };
  } else {
    return {
      [className]: cssObject,
    };
  }
}
