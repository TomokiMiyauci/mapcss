import {
  deepMerge,
  distinctBy,
  head,
  init,
  isFunction,
  isRegExp,
  isString,
  isUndefined,
  last,
  prop,
  propPath,
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

export function resolveMappedSpecifier(
  value: string | string[],
  mappedSpecifier: MappedSpecifier,
  context:
    & Omit<SpecifierContext, "className" | "key" | "parentKey" | "path">
    & { parentKey?: string; key?: string },
): Root | undefined {
  const className = `.${escapeRegExp(context.token)}`;
  const paths = leftSplit(value, context.separator);

  for (const path of paths) {
    const first = head(path) ?? "DEFAULT";
    const rest = tail(path);

    const specifierContext: SpecifierContext = {
      ...context,
      parentKey: context.key,
      className,
      key: first,
      path,
    };
    const has = mappedSpecifier.has(first);
    if (has) {
      const definition = mappedSpecifier.get(first)!;
      if (isFunction(definition)) {
        const result = definition(new MockRegExpExecArray(), specifierContext);
        specifierContext.parentKey = first;
        if (isUndefined(result)) continue;
        return handleCSSObject(result, className);
      }

      if (definition instanceof Map) {
        return resolveMappedSpecifier(rest, definition, specifierContext);
      }
      return handleCSSObject(definition, className);
    }

    for (const [key, m] of mappedSpecifier) {
      if (isRegExp(key)) {
        const regExpExecResult = key.exec(first);
        if (!regExpExecResult) continue;

        if (isFunction(m)) {
          const result = m(regExpExecResult, specifierContext);
          if (isUndefined(result)) continue;

          return handleCSSObject(result, className);
        }
        if (m instanceof Map) {
          return resolveMappedSpecifier(rest, m, specifierContext);
        }
        return handleCSSObject(m, className);
      }
    }
  }
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

/** new version for theme resolver */
export function $resolveTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: ThemeContext,
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
):
  & Pick<
    Config,
    "modifierMap" | "theme" | "syntaxes" | "postProcess"
  >
  & { mappedSpecifier: MappedSpecifier } {
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
  const mappedSpecifier = mergeSpecifierMap(
    _presets.map(({ specifierMap }) => specifierMap),
  );

  const postProcess = resolvePostProcessor(
    ..._postProcess,
    ..._presets.map(({ postProcessor }) => postProcessor).flat(),
  );

  return {
    mappedSpecifier,
    theme,
    modifierMap,
    syntaxes,
    postProcess,
  };
}

type TreeMap<Leaf, P> = Map<P, Leaf | TreeMap<Leaf, P>>;

type MappedSpecifier = TreeMap<SpecifierHandler | CSSObject, string | RegExp>;

export function mergeSpecifierMap(
  specifierMaps: SpecifierMap[],
): MappedSpecifier {
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
