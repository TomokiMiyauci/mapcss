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
import {
  isCSSObject,
  isRecordSpecifier,
  isRegExpSpecifierSet,
} from "./assert.ts";
import type { Corner } from "./types.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  RegExpSpecifierHandler,
  Specifier,
  SpecifierContext,
  SpecifierMap,
  Theme,
} from "../types.ts";

/** resolve theme via propPath safety */
export function resolveTheme(
  identifier: string,
  themeRoot: string,
  { separator, theme }: SpecifierContext,
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

function resolveSpecifier(
  paths: string[],
  specifier: Specifier,
  context: SpecifierContext,
): CSSObject | undefined {
  const first = head(paths);

  const FALLBACK = "DEFAULT";

  if (isRecordSpecifier(specifier)) {
    if (isUndefined(first)) {
      const maybeCSSObject = prop(FALLBACK, specifier);
      if (isCSSObject(maybeCSSObject)) {
        return maybeCSSObject;
      }
      return;
    }
    const result = prop(first, specifier);
    if (isCSSObject(result)) {
      return result;
    }
    if (isUndefined(result)) {
      return;
    }

    return resolveSpecifier(tail(paths), result, context);
  } else {
    const map = new Map<
      string | RegExp,
      Specifier | CSSObject | RegExpSpecifierHandler
    >(specifier.map(([identifier, handler]) => {
      const _identifier = isRegExp(identifier)
        ? identifier
        : String(identifier);
      return [_identifier, handler];
    }));
    const _first = first ?? FALLBACK;
    if (map.has(_first)) {
      const specifierOrCSSObject = map.get(_first)! as Specifier | CSSObject;
      if (isCSSObject(specifierOrCSSObject)) {
        return specifierOrCSSObject;
      }
      return resolveSpecifier(tail(paths), specifierOrCSSObject, context);
    }

    const regExpSpecifierSets = (Array.from(map) as EntriesSpecifier).filter(
      isRegExpSpecifierSet,
    );
    for (const [regExp, handler] of regExpSpecifierSets) {
      const regExpExecArray = regExp.exec(_first);
      if (regExpExecArray) {
        if (isFunction(handler)) {
          const result = handler(regExpExecArray, context);
          if (isUndefined(result)) {
            continue;
          }
          return result;
        }
        return resolveSpecifier(tail(paths), handler, context);
      }
    }
  }
}

export function resolveDeep(
  paths: string[],
  specifierMap: Record<string, Specifier | CSSObject>,
  context: SpecifierContext,
): undefined | CSSObject {
  const [first, ...rest] = paths;

  const maybeSpecifier = prop(first, specifierMap);
  if (isUndefined(maybeSpecifier)) return;
  if (isCSSObject(maybeSpecifier)) {
    if (isLength0(rest)) {
      return maybeSpecifier;
    }
    return;
  }

  return resolveSpecifier(rest, maybeSpecifier, context);
}

export function resolveMap(
  value: string,
  { separator, specifierMap, theme }: {
    separator: string;
    specifierMap: SpecifierMap;
    theme: Theme;
  },
) {
  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const maybeCSSObject = resolveDeep(path, specifierMap, {
      theme,
      separator,
    });

    if (maybeCSSObject) {
      return maybeCSSObject;
    }
  }
}
