import { filterValues, has, isString } from "../deps.ts";
import { extractSplit } from "./extractor.ts";
import { resolveSpecifierMap } from "./resolve.ts";
import {
  cssStatements2CSSNestedModule,
  stringifyCSSNestedModule,
} from "./utils/format.ts";
import type {
  Config,
  CSSStatement,
  GlobalModifier,
  LocalModifier,
  RuleSet,
  SpecifierMap,
  Theme,
} from "./types.ts";
import { resolveConfig } from "./config.ts";
import {
  declarationOrderProcessor,
  statementOrderProcessor,
} from "./post_process.ts";
export * from "./types.ts";

export interface GenerateResult {
  css: string;
  matched: Set<string>;
  unmatched: Set<string>;
}

function execute(
  { specifier, globalModifiers, localModifiers }: {
    specifier: string;
    globalModifiers: string[];
    localModifiers: string[];
  },
  {
    theme,
    specifierMap,
    separator,
    token,
    globalModifierMap,
    localModifierMap,
    variablePrefix,
  }: {
    theme: Theme;
    specifierMap: SpecifierMap;
    globalModifierMap: Record<string, GlobalModifier>;
    localModifierMap: Record<string, LocalModifier>;
    separator: string;
    token: string;
    variablePrefix: string;
  },
): Required<CSSStatement>[] | undefined {
  const CSSStatements = resolveSpecifierMap(specifier, specifierMap, {
    theme,
    separator,
    variablePrefix,
    token,
  });
  if (!CSSStatements) return;

  const maybe = CSSStatements.map((cssStatement) => {
    if (cssStatement.type === "groupAtRule") return cssStatement;
    return localModifiers.reduce(
      (acc, cur) => {
        if (!acc) return;

        const handler = localModifierMap[cur];
        const declaration = handler.fn(acc.declaration, {
          theme,
          modifier: cur,
          separator,
        });
        if (!declaration) return;
        return {
          ...acc,
          declaration,
        };
      },
      cssStatement as RuleSet | undefined,
    );
  }).filter(Boolean) as Required<CSSStatement>[];

  const statement = maybe.map((cssStatement) => {
    return globalModifiers.reduce((acc, cur) => {
      if (!acc) return;
      const handler = globalModifierMap[cur];
      const result = handler.fn(acc, {
        theme,
        modifier: cur,
        separator,
      });
      if (!result) return;
      return result;
    }, cssStatement as Required<CSSStatement> | undefined);
  }).filter(Boolean) as Required<CSSStatement>[];

  return statement;
}

/** Generate CSS Style Sheet as string */
export function generateStyleSheet(
  {
    separator = "-",
    variablePrefix = "map-",
    postProcess = [],
    ...config
  }: Partial<
    Config
  >,
  input: Set<string> | string,
): GenerateResult {
  const { syntaxes, modifierMap, theme, specifierMap } = resolveConfig(config);
  const tokens = isString(input) ? extractSplit(input) : input;
  const matched = new Set<string>();
  const unmatched = new Set<string>();

  const globalModifierMap = filterValues(
    modifierMap,
    ({ type }) => type === "global",
  ) as Record<string, GlobalModifier>;
  const localModifierMap = filterValues(
    modifierMap,
    ({ type }) => type === "local",
  ) as Record<string, LocalModifier>;

  const results = Array.from(tokens).map((token) => {
    const executeResults = syntaxes.map(({ fn }) => {
      const parseResult = fn({
        token,
        globalModifierNames: Object.keys(globalModifierMap),
        localModifierNames: Object.keys(localModifierMap),
        specifierRoots: Object.keys(specifierMap),
      });
      if (!parseResult) return;
      const { specifier, globalModifiers = [], localModifiers = [] } =
        parseResult;

      const hasDefinedGlobalModifiers = globalModifiers.every((modifier) =>
        has(modifier, globalModifierMap)
      );
      const hasDefinedLocalModifiers = localModifiers.every((modifier) =>
        has(modifier, localModifierMap)
      );
      if (!hasDefinedGlobalModifiers || !hasDefinedLocalModifiers) return;

      const result = execute(
        { specifier, globalModifiers, localModifiers },
        {
          theme,
          specifierMap,
          globalModifierMap,
          localModifierMap,
          separator,
          token,
          variablePrefix,
        },
      );
      return result;
    }).filter(Boolean).flat() as CSSStatement[];
    return executeResults;
  }).flat();

  postProcess.unshift(statementOrderProcessor);
  postProcess.unshift(declarationOrderProcessor);

  const final = postProcess.reduce((acc, cur) => {
    return cur.fn(acc);
  }, results);
  const cssNestedModule = cssStatements2CSSNestedModule(final);
  const css = stringifyCSSNestedModule(cssNestedModule);

  return { css, matched, unmatched };
}
