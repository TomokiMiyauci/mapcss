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
  isCSSObjectSet,
  isRecordSpecifier,
  isRegExpSpecifierSet,
} from "./assert.ts";
import type { Corner } from "./types.ts";
import type {
  CSSObject,
  CSSObjectSet,
  EntriesSpecifier,
  Specifier,
  SpecifierContext,
  SpecifierHandler,
  SpecifierMap,
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

type SpecifierResult = [CSSObject, { combinator: string }];

function resolveSpecifier(
  paths: string[],
  specifier: Specifier,
  context: SpecifierContext,
): SpecifierResult | undefined {
  const first = head(paths);

  const FALLBACK = "DEFAULT";

  if (isRecordSpecifier(specifier)) {
    if (isUndefined(first)) {
      const maybeCSSObject = prop(FALLBACK, specifier);
      if (isCSSObject(maybeCSSObject)) {
        return [maybeCSSObject, { combinator: "" }];
      }
      if (isCSSObjectSet(maybeCSSObject)) {
        return [maybeCSSObject[0], { combinator: maybeCSSObject[1] }];
      }

      if (isFunction(maybeCSSObject)) {
        return cssObjectOrSet(
          maybeCSSObject(new MockRegExpExecArray(""), context),
        );
      }
      return;
    }
    const result = prop(first, specifier);
    if (isCSSObject(result)) {
      return [result, { combinator: "" }];
    }
    if (isCSSObjectSet(result)) {
      return [result[0], { combinator: result[1] }];
    }
    if (isUndefined(result)) {
      return;
    }
    if (isFunction(result)) {
      return cssObjectOrSet(result(new MockRegExpExecArray(""), context));
    }

    return resolveSpecifier(tail(paths), result, context);
  } else {
    const map = new Map<
      string | RegExp,
      Specifier | CSSObject | CSSObjectSet | SpecifierHandler
    >(specifier.map(([identifier, handler]) => {
      const _identifier = isRegExp(identifier)
        ? identifier
        : String(identifier);
      return [_identifier, handler];
    }));
    const _first = first ?? FALLBACK;
    if (map.has(_first)) {
      const specifierOrCSSObject = map.get(_first)! as
        | Specifier
        | CSSObject
        | CSSObjectSet
        | SpecifierHandler;
      if (isCSSObject(specifierOrCSSObject)) {
        return [specifierOrCSSObject, { combinator: "" }];
      }
      if (isCSSObjectSet(specifierOrCSSObject)) {
        return [specifierOrCSSObject[0], {
          combinator: specifierOrCSSObject[1],
        }];
      }
      if (isFunction(specifierOrCSSObject)) {
        const result = specifierOrCSSObject(
          new MockRegExpExecArray(""),
          context,
        );
        if (!isUndefined(result)) {
          return cssObjectOrSet(result);
        }
        return;
      }
      return resolveSpecifier(tail(paths), specifierOrCSSObject, context);
    }

    const regExpSpecifierSets = (Array.from(map) as EntriesSpecifier).filter(
      isRegExpSpecifierSet,
    );
    for (const [maybeRegExp, handler] of regExpSpecifierSets) {
      const regExpExecArray = isRegExp(maybeRegExp)
        ? (() => maybeRegExp.exec(_first))()
        : new MockRegExpExecArray("");
      if (regExpExecArray) {
        if (isFunction(handler)) {
          const result = handler(regExpExecArray, context);
          if (isUndefined(result)) {
            continue;
          }
          return cssObjectOrSet(result);
        }
        return resolveSpecifier(tail(paths), handler, context);
      }
    }
  }
}

function cssObjectOrSet(
  value: CSSObject | CSSObjectSet | undefined,
): SpecifierResult | undefined {
  if (isUndefined(value)) return;
  if (isCSSObject(value)) {
    return [value, { combinator: "" }];
  }
  return [value[0], { combinator: value[1] }];
}

class MockRegExpExecArray extends Array<string> {
  index = 0;

  constructor(public input: string) {
    super();
  }
}

export function resolveDeep(
  paths: string[],
  specifierMap: Record<string, Specifier | CSSObject>,
  context: SpecifierContext,
): SpecifierResult | undefined {
  const [first, ...rest] = paths;

  const maybeSpecifier = prop(first, specifierMap);
  if (isUndefined(maybeSpecifier)) return;
  if (isCSSObject(maybeSpecifier)) {
    if (isLength0(rest)) {
      return [maybeSpecifier, { combinator: "" }];
    }
    return;
  }

  return resolveSpecifier(rest, maybeSpecifier, context);
}

export function resolveSpecifierMap(
  value: string,
  specifierMap: SpecifierMap,
  { separator, ...rest }: SpecifierContext,
) {
  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const maybeCSSObject = resolveDeep(path, specifierMap, {
      separator,
      ...rest,
    });

    if (maybeCSSObject) {
      return maybeCSSObject;
    }
  }
}
