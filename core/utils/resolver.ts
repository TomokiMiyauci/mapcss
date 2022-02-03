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
import { cornerMap } from "./mapping.ts";
import { isCSSObject, isRecordMapper, isRegExpMapperSet } from "./assert.ts";
import type { Corner } from "./types.ts";
import type {
  CSSObject,
  EntriesMapper,
  Mapper,
  MapperContext,
  MapperMap,
  RegExpMapperHandler,
  Theme,
} from "../types.ts";

/** resolve theme via propPath safety */
export function resolveTheme(
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
    mapperMap: MapperMap;
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
