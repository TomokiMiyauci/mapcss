import {
  head,
  init,
  isFunction,
  isRegExp,
  isString,
  isUndefined,
  last,
  prop,
  propPath,
  Some,
  tail,
} from "../../deps.ts";
import {
  isCSSObject,
  isRecordSpecifier,
  isRegExpSpecifierSet,
  isSpecifierDefinition,
} from "./assert.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  PartialCSSStatement,
  Specifier,
  SpecifierContext,
  SpecifierDefinition,
  SpecifierMap,
  ThemeContext,
} from "../types.ts";

function constructCSSStatement(
  value: CSSObject | PartialCSSStatement,
): PartialCSSStatement {
  if (isCSSObject(value)) {
    return { cssObject: value };
  }
  return value;
}

function resolveSpecifierDefinition(
  specifierDefinition: SpecifierDefinition,
  { regExpExecArray, context }: {
    regExpExecArray: RegExpExecArray;
    context: SpecifierContext;
  },
): PartialCSSStatement | PartialCSSStatement[] | undefined {
  if (isFunction(specifierDefinition)) {
    const result = specifierDefinition(regExpExecArray, context);
    if (result) {
      return resolveSpecifierDefinition(result, { regExpExecArray, context });
    }
    return;
  } else if (Array.isArray(specifierDefinition)) {
    return specifierDefinition.map(constructCSSStatement);
  }
  return constructCSSStatement(specifierDefinition);
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

function resolveSpecifier(
  paths: string[],
  specifier: Specifier,
  context: SpecifierContext,
): PartialCSSStatement | PartialCSSStatement[] | undefined {
  const first = head(paths);

  const FALLBACK = "DEFAULT";

  if (isRecordSpecifier(specifier)) {
    const key = isUndefined(first) ? FALLBACK : first;
    const result = prop(key, specifier);
    if (isUndefined(result)) {
      return;
    }
    if (isSpecifierDefinition(result)) {
      return resolveSpecifierDefinition(result, {
        regExpExecArray: new MockRegExpExecArray(""),
        context,
      });
    }

    return resolveSpecifier(tail(paths), result, context);
  } else {
    const map = new Map<
      string | RegExp,
      Specifier | SpecifierDefinition
    >(specifier.map(([identifier, handler]) => {
      const _identifier = isRegExp(identifier)
        ? identifier
        : String(identifier);
      return [_identifier, handler];
    }));
    const _first = first ?? FALLBACK;
    if (map.has(_first)) {
      const result = map.get(_first)!;
      if (isSpecifierDefinition(result)) {
        return resolveSpecifierDefinition(result, {
          regExpExecArray: new MockRegExpExecArray(""),
          context,
        });
      }
      return resolveSpecifier(tail(paths), result, context);
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
          return resolveSpecifierDefinition(result, {
            regExpExecArray,
            context,
          });
        }
        return resolveSpecifier(tail(paths), handler, context);
      }
    }
  }
}

class MockRegExpExecArray extends Array<string> {
  index = 0;

  constructor(public input: string) {
    super();
  }
}

export function resolveDeep(
  paths: string[],
  specifierMap: SpecifierMap,
  context: SpecifierContext,
): PartialCSSStatement[] | undefined {
  const [first, ...rest] = paths;

  const maybeSpecifier = prop(first, specifierMap);
  if (isUndefined(maybeSpecifier)) return [];
  if (isSpecifierDefinition(maybeSpecifier)) {
    const result = resolveSpecifierDefinition(maybeSpecifier, {
      regExpExecArray: new MockRegExpExecArray(""),
      context,
    });
    return Some(result).map(wrap).match({
      some: (v) => v,
      none: undefined,
    });
  }

  const result = resolveSpecifier(rest, maybeSpecifier, context);
  return Some(result).map(wrap).match({
    some: (v) => v,
    none: undefined,
  });
}

function wrap<T>(value: T): T extends any[] ? T : T[] {
  return Array.isArray(value) ? value : [value] as any;
}

export function resolveSpecifierMap(
  value: string,
  specifierMap: SpecifierMap,
  { separator, ...rest }: SpecifierContext,
): PartialCSSStatement[] | undefined {
  const paths = leftSplit(value, separator);

  for (const path of paths) {
    const maybeCSSObject = resolveDeep(path, specifierMap, {
      separator,
      ...rest,
    });

    if (maybeCSSObject && maybeCSSObject.length) {
      return maybeCSSObject;
    }
  }
}
