import {
  head,
  init,
  isFunction,
  isLength0,
  isRegExp,
  isString,
  isUndefined,
  last,
  prop,
  propPath,
  tail,
} from "../../deps.ts";
import { axisMap, cornerMap, direction4Map } from "./mapping.ts";
import { isCSSObject, isRecordMapper, isRegExpMapperSet } from "./assert.ts";
import type { Axis, Corner, Dir } from "./types.ts";
import type {
  CSSObject,
  EntriesMapper,
  Mapper,
  MapperContext,
  RegExpMapperHandler,
  Theme,
} from "../types.ts";

type ResolveTheme<
  Scope extends PropertyKey,
  P extends PropertyKey | PropertyKey[],
> = {
  /** theme scopes */
  scope: Scope;

  /** path to theme */
  path: P;
};

/** resolve theme via propPath safety */
export function resolveTheme<
  T extends Theme = Theme,
  Scope extends PropertyKey = PropertyKey,
  Path extends PropertyKey[] | PropertyKey = PropertyKey,
>(
  theme: T,
  { scope, path }: ResolveTheme<Scope, Path>,
): PropPath<T, Path> {
  const _ = Array.isArray(path) ? path : [path];
  const prop = propPath([scope, ..._], theme);
  if (!isUndefined(prop)) {
    return prop as never;
  }
  return undefined as never;
}

export function resolveXTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: MapperContext,
): string | undefined {
  const paths = leftSplit(identifier, separator);
  for (const path of paths) {
    const result = propPath([themeRoot, ...path], theme);
    if (isString(result)) {
      return result;
    }
  }
}

type PropPath<T extends Record<any, any>, P extends unknown[] | unknown> =
  P extends unknown[]
    ? P extends [infer X, ...infer Rest] ? PropPath<T[X], Rest> : T
    : T[P] | undefined;

export function resolveDirection(key: Dir | Axis): string[] | undefined {
  const _direction4Map = Object.entries(direction4Map).reduce(
    (acc, [key, value]) => {
      return { ...acc, [key]: [value] };
    },
    {} as Record<Dir, string[]>,
  );
  const dirAxisMap = { ...axisMap, ..._direction4Map };
  return dirAxisMap[key];
}

function firstSplit(
  value: string,
  separator: string,
): undefined | string[] {
  const arr = new RegExp(`(.+?)${separator}(.+)`).exec(value);
  if (!arr) return;

  const [_, ...rest] = arr;

  return rest;
}

export function resolveCorner(key: Corner): string[] {
  return cornerMap[key];
}

function leftSplit(value: string[] | string, separator: string): string[][] {
  const _value = isString(value) ? [value] : value;

  const _last = last(_value);
  if (!_last) return [_value];

  const result = firstSplit(_last, separator);
  if (!result) return [_value];

  return [_value, ...leftSplit([...init(_value), ...result], separator)];
}

function resolveMapper(
  paths: string[],
  mapper: Mapper,
  context: MapperContext,
): CSSObject | undefined {
  const first = head(paths);

  const FALLBACK = "DEFAULT";

  if (isRecordMapper(mapper)) {
    if (isUndefined(first)) {
      const maybeCSSObject = prop(FALLBACK, mapper);
      if (isCSSObject(maybeCSSObject)) {
        return maybeCSSObject;
      }
      return;
    }
    const result = prop(first, mapper);
    if (isCSSObject(result)) {
      return result;
    }
    if (isUndefined(result)) {
      return;
    }

    return resolveMapper(tail(paths), result, context);
  } else {
    const map = new Map<
      string | RegExp,
      Mapper | CSSObject | RegExpMapperHandler
    >(mapper.map(([identifier, handler]) => {
      const _identifier = isRegExp(identifier)
        ? identifier
        : String(identifier);
      return [_identifier, handler];
    }));
    const _first = first ?? FALLBACK;
    if (map.has(_first)) {
      const mapperOrCSSObject = map.get(_first)! as Mapper | CSSObject;
      if (isCSSObject(mapperOrCSSObject)) {
        return mapperOrCSSObject;
      }
      return resolveMapper(tail(paths), mapperOrCSSObject, context);
    }

    const regExpMapperSets = (Array.from(map) as EntriesMapper).filter(
      isRegExpMapperSet,
    );
    for (const [regExp, handler] of regExpMapperSets) {
      const regExpExecArray = regExp.exec(_first);
      if (regExpExecArray) {
        if (isFunction(handler)) {
          const result = handler(regExpExecArray, context);
          if (isUndefined(result)) {
            continue;
          }
          return result;
        }
        return resolveMapper(tail(paths), handler, context);
      }
    }
  }
}

export function resolveDeep(
  paths: string[],
  mapperMap: Record<string, Mapper | CSSObject>,
  context: MapperContext,
): undefined | CSSObject {
  const [first, ...rest] = paths;

  const maybeMapper = prop(first, mapperMap);
  if (isUndefined(maybeMapper)) return;
  if (isCSSObject(maybeMapper)) {
    if (isLength0(rest)) {
      return maybeMapper;
    }
    return;
  }

  return resolveMapper(rest, maybeMapper, context);
}

export function resolveMap(
  value: string,
  { separator, mapperMap, theme }: {
    separator: string;
    mapperMap: Record<string, Mapper | CSSObject>;
    theme: Theme;
  },
) {
  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const maybeCSSObject = resolveDeep(path, mapperMap, {
      theme,
      separator,
    });

    if (maybeCSSObject) {
      return maybeCSSObject;
    }
  }
}
