import {
  deepMerge,
  distinctBy,
  head,
  init,
  isEmptyObject,
  isFunction,
  isLength0,
  isRegExp,
  isString,
  isUndefined,
  last,
  prop,
  propPath,
  Root,
  Rule,
  tail,
} from "../deps.ts";
import { astify } from "./ast.ts";
import { isCSSDefinition, isCSSObject } from "./utils/assert.ts";
import type {
  CSSObject,
  ModifierContext,
  ModifierMap,
  PreProcessor,
  Preset,
  Specifier,
  SpecifierContext,
  SpecifierHandler,
  SpecifierMap,
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

export function resolveDeepMapSpecifier(
  value: string | string[],
  deepMapSpecifier: DeepMapSpecifier,
  context:
    & Omit<SpecifierContext, "key" | "parentKey" | "path">
    & { parentKey?: string; key?: string },
): Root | undefined {
  const paths = leftSplit(value, context.separator);
  for (const path of paths) {
    const first = head(path) ?? "DEFAULT";
    const rest = tail(path);

    const specifierContext: SpecifierContext = {
      ...context,
      parentKey: context.key,
      key: first,
      path,
    };
    const has = deepMapSpecifier.has(first);
    if (has) {
      const definition = deepMapSpecifier.get(first)!;
      if (isFunction(definition)) {
        if (!isLength0(rest)) continue;
        const result = definition(new MockRegExpExecArray(), specifierContext);
        if (isUndefined(result)) continue;
        return handleCSSObject(result, specifierContext.className);
      }

      if (definition instanceof Map) {
        return resolveDeepMapSpecifier(rest, definition, specifierContext);
      }
      if (isEmptyObject(definition)) return;
      return handleCSSObject(definition, specifierContext.className);
    }

    for (const [key, m] of deepMapSpecifier) {
      if (isRegExp(key)) {
        const regExpExecResult = key.exec(first);
        if (!regExpExecResult) continue;

        if (isFunction(m)) {
          const result = m(regExpExecResult, specifierContext);
          if (isUndefined(result)) continue;

          return handleCSSObject(result, specifierContext.className);
        }
        if (m instanceof Map) {
          return resolveDeepMapSpecifier(rest, m, specifierContext);
        }
        if (isEmptyObject(m)) return;
        return handleCSSObject(m, specifierContext.className);
      }
    }
  }
}

function handleCSSObject(cssObject: CSSObject, selector: string): Root {
  if (cssObject instanceof Root) {
    return cssObject;
  } else if (isCSSDefinition(cssObject)) {
    return astify(cssObject.value);
  } else {
    return new Root({
      nodes: [new Rule({ selector, nodes: astify(cssObject).nodes })],
    });
  }
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
      specifierMap = {},
      modifierMap = {},
      theme = {},
      preProcess = [],
      css = {},
    } = fn(context);
    return {
      syntax,
      specifierMap,
      modifierMap,
      theme,
      preProcess,
      css,
    };
  });
}

/** resolve config to deep merge */
export function resolveConfig(
  {
    syntax: _syntax = [],
    preset = [],
    specifierMap: _specifierMap = {},
    theme: _theme = {},
    preProcess: _postProcess = [],
    modifierMap: _modifierMap = {},
    css: _css = {},
  }: Readonly<
    Partial<
      StaticConfig
    >
  >,
  context: Readonly<Omit<StaticContext, "theme">>,
):
  & Omit<StaticConfig, "specifierMap" | "preset">
  & { deepMapSpecifier: DeepMapSpecifier } {
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
  const deepMapSpecifier = mergeSpecifierMap(
    [..._presets.map(({ specifierMap }) => specifierMap), _specifierMap],
  );

  const preProcess = resolvePreProcessor(
    ..._postProcess,
    ..._presets.map(({ preProcess }) => preProcess).flat(),
  );
  const css = [..._presets.map(({ css }) => css), _css].reduce(
    (acc, cur) => deepMerge(acc, cur),
    {},
  );

  return {
    deepMapSpecifier,
    theme,
    modifierMap,
    syntax,
    preProcess,
    css,
  };
}

type TreeMap<Leaf, P> = Map<P, Leaf | TreeMap<Leaf, P>>;

type DeepMapSpecifier = TreeMap<SpecifierHandler | CSSObject, string | RegExp>;

export function mergeSpecifierMap(
  specifierMaps: SpecifierMap[],
): DeepMapSpecifier {
  const recursive = (
    m: Specifier,
    map: Map<string | RegExp, any>,
  ): Map<string | RegExp, SpecifierHandler | CSSObject> => {
    const entries = Array.isArray(m) ? m : Object.entries(m);

    entries.forEach(([key, value]) => {
      const _key = isRegExp(key) ? key : String(key);
      if (isFunction(value) || isCSSObject(value)) {
        map.set(_key, value);
      } else {
        map.set(
          _key,
          recursive(
            value,
            new Map<string | RegExp, SpecifierHandler | CSSObject>(),
          ),
        );
      }
    });
    return map;
  };

  return specifierMaps.reduce(
    (acc, cur) => recursive(cur, acc),
    new Map<string | RegExp, SpecifierHandler | CSSObject>(),
  );
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
