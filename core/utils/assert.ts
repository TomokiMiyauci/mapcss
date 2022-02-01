import type {
  AtRule,
  CSSObject,
  EntriesMapper,
  Mapper,
  RecordMapper,
  RegExpMapperSet,
  RuleSet,
  StringMapperSet,
} from "./../types.ts";
import { isObject, isRegExp, isString } from "../../deps.ts";

export function isCSSObject(value: unknown): value is CSSObject {
  if (!isObject(value)) return false;

  return Object.values(value).every((v) => !isObject(v));
}

export function isEntriesMapper(mapper: Mapper): mapper is EntriesMapper {
  return Array.isArray(mapper);
}

export function isRecordMapper(mapper: Mapper): mapper is RecordMapper {
  return !Array.isArray(mapper);
}

export function isRegExpMapperSet(
  set: StringMapperSet | RegExpMapperSet,
): set is RegExpMapperSet {
  return isRegExp(set[0]);
}

export function isStringMapperSet(
  set: StringMapperSet | RegExpMapperSet,
): set is StringMapperSet {
  return isString(set[0]);
}

export function isAtRule(
  cssStatement: AtRule | RuleSet,
): cssStatement is AtRule {
  return "identifier" in cssStatement;
}

export function isRuleSet(
  cssStatement: AtRule | RuleSet,
): cssStatement is RuleSet {
  return "declarationBlock" in cssStatement;
}
