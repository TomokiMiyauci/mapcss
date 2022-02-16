import { filterValues, has, isString } from "../deps.ts";
import { resolveSpecifierMap } from "./utils/resolver.ts";
import { escapeRegExp } from "./utils/escape.ts";
import { extractSplit } from "./extractor.ts";
import {
  cssStatements2CSSNestedModule,
  stringifyCSSNestedModule,
} from "./utils/format.ts";
import type {
  Config,
  CSSObject,
  CSSStatement,
  GlobalModifier,
  GlobalModifierHandler,
  LocalModifier,
  LocalModifierHandler,
  SpecifierMap,
  Theme,
} from "./types.ts";
import { resolveConfig } from "./config.ts";
import { statementOrderProcessor } from "./post_process.ts";
export * from "./types.ts";

export interface GenerateResult {
  css: string;
  matched: Set<string>;
  unmatched: Set<string>;
}

type ExecuteResult = [CSSStatement, {
  globalModifierHandlers: [string, GlobalModifierHandler][];
  localModifierHandlers: [string, LocalModifierHandler][];
  specifier: string;
  token: string;
}][];

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
): ExecuteResult | undefined {
  const hasDefinedGlobalModifiers = globalModifiers.every((modifier) =>
    has(modifier, globalModifierMap)
  );
  const hasDefinedLocalModifiers = localModifiers.every((modifier) =>
    has(modifier, localModifierMap)
  );
  if (!hasDefinedGlobalModifiers || !hasDefinedLocalModifiers) return;
  const partialCSSStatement = resolveSpecifierMap(specifier, specifierMap, {
    theme,
    separator,
    variablePrefix,
  });

  if (!partialCSSStatement) return;

  const globalModifierHandlers = globalModifiers.map((modifier) =>
    [modifier, globalModifierMap[modifier].fn] as [
      string,
      GlobalModifierHandler,
    ]
  );
  const localModifierHandlers = localModifiers.map((modifier) =>
    [modifier, localModifierMap[modifier].fn] as [
      string,
      LocalModifierHandler,
    ]
  );

  return partialCSSStatement.map((partialCSSStatement) => [
    { basicSelector: specifier, ...partialCSSStatement },
    {
      globalModifierHandlers,
      localModifierHandlers,
      specifier,
      token,
    },
  ]);
}

function asc(a: string, b: string): number {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
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
    }).filter(Boolean).flat() as ExecuteResult;
    return executeResults;
  }).flat();

  const cssStatements = results.map(
    (
      [{
        cssObject,
        pseudo,
        combinator,
        atRules = [],
      }, {
        globalModifierHandlers,
        localModifierHandlers,
        token,
      }],
    ) => {
      const maybeCSSObject = localModifierHandlers.reduce(
        (acc, [key, handler]) => {
          if (!acc) return;
          return handler(acc, { theme, modifier: key, separator });
        },
        cssObject as CSSObject | undefined,
      );
      if (!maybeCSSObject) return;

      const basicSelector = `.${escapeRegExp(token)}`;

      const orderedCSSObject = Object.entries(maybeCSSObject).sort((
        [property],
        [nextProperty],
      ) => asc(property, nextProperty));

      const cssStatement = globalModifierHandlers.reduceRight(
        (acc, [name, handler]) => {
          const result = handler(acc, {
            theme,
            modifier: name,
            separator,
          });
          if (result) {
            const { atRule, order, ...rest } = result;
            if (atRule) {
              acc.atRules.unshift(atRule);
            }
            if (order) {
              acc.orders.unshift(order);
            }
            return {
              ...acc,
              ...rest,
            };
          }
          return acc;
        },
        {
          cssObject: Object.fromEntries(orderedCSSObject),
          pseudo,
          basicSelector,
          combinator,
          atRules,
          orders: [],
        } as Required<CSSStatement>,
      );

      matched.add(token);

      return cssStatement;
    },
  ).filter(Boolean) as Required<CSSStatement>[];

  postProcess.unshift(statementOrderProcessor);

  const final = postProcess.reduce((acc, cur) => {
    return cur.fn(acc);
  }, cssStatements);
  const cssNestedModule = cssStatements2CSSNestedModule(final);
  const css = stringifyCSSNestedModule(cssNestedModule);

  return { css, matched, unmatched };
}
