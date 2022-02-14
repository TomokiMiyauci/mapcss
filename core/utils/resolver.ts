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
  isPartialCSSStatement,
  isRecordSpecifier,
  isRegExpSpecifierSet,
} from "./assert.ts";
import type { Corner } from "./types.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  PartialCSSStatement,
  Specifier,
  SpecifierContext,
  SpecifierHandler,
  SpecifierMap,
  ThemeContext,
} from "../types.ts";

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
): PartialCSSStatement | undefined {
  const first = head(paths);

  const FALLBACK = "DEFAULT";

  if (isRecordSpecifier(specifier)) {
    if (isUndefined(first)) {
      const maybeCSSObject = prop(FALLBACK, specifier);
      if (isCSSObject(maybeCSSObject)) {
        return { cssObject: maybeCSSObject };
      }
      if (isPartialCSSStatement(maybeCSSObject)) {
        return maybeCSSObject;
      }

      if (isFunction(maybeCSSObject)) {
        return cssObjectOrStatement(
          maybeCSSObject(new MockRegExpExecArray(""), context),
        );
      }
      return;
    }
    const result = prop(first, specifier);
    if (isCSSObject(result)) {
      return { cssObject: result };
    }
    if (isPartialCSSStatement(result)) {
      return result;
    }
    if (isUndefined(result)) {
      return;
    }
    if (isFunction(result)) {
      return cssObjectOrStatement(result(new MockRegExpExecArray(""), context));
    }

    return resolveSpecifier(tail(paths), result, context);
  } else {
    const map = new Map<
      string | RegExp,
      Specifier | CSSObject | PartialCSSStatement | SpecifierHandler
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
        | PartialCSSStatement
        | SpecifierHandler;
      if (isCSSObject(specifierOrCSSObject)) {
        return { cssObject: specifierOrCSSObject };
      }
      if (isPartialCSSStatement(specifierOrCSSObject)) {
        return specifierOrCSSObject;
      }
      if (isFunction(specifierOrCSSObject)) {
        const result = specifierOrCSSObject(
          new MockRegExpExecArray(""),
          context,
        );
        return cssObjectOrStatement(result);
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
          return cssObjectOrStatement(result);
        }
        return resolveSpecifier(tail(paths), handler, context);
      }
    }
  }
}

function cssObjectOrStatement(
  value: CSSObject | PartialCSSStatement | undefined,
): PartialCSSStatement | undefined {
  if (isUndefined(value)) return;
  if (isCSSObject(value)) {
    return { cssObject: value };
  }
  return value;
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
): PartialCSSStatement | undefined {
  const [first, ...rest] = paths;

  const maybeSpecifier = prop(first, specifierMap);
  if (isUndefined(maybeSpecifier)) return;
  if (isCSSObject(maybeSpecifier)) {
    if (isLength0(rest)) {
      return { cssObject: maybeSpecifier };
    }
    return;
  }

  return resolveSpecifier(rest, maybeSpecifier, context);
}

export function resolveSpecifierMap(
  value: string,
  specifierMap: SpecifierMap,
  { separator, ...rest }: SpecifierContext,
): PartialCSSStatement | undefined {
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
