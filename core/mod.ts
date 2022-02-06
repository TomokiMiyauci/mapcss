import { cssDeclarationBlock } from "./_utils.ts";
import { filterValues, has, head, isLength0, isString } from "../deps.ts";
import { resolveMap } from "./utils/resolver.ts";
import { escapeRegExp } from "./utils/escape.ts";
import { extractSplit } from "./extractor.ts";
import type {
  Config,
  CSSObject,
  GlobalModifier,
  GlobalModifierHandler,
  LocalModifier,
  LocalModifierHandler,
  SpecifierMap,
  Theme,
} from "./types.ts";
import { resolveConfig } from "./config.ts";
export * from "./types.ts";

export interface GenerateResult {
  css: string;
  matched: Set<string>;
  unmatched: Set<string>;
}

type ExecuteResult = {
  cssObject: CSSObject;
  combinator: string;
  selector: string;
  globalModifierHandlers: [string, GlobalModifierHandler][];
  localModifierHandlers: [string, LocalModifierHandler][];
  specifier: string;
  token: string;
};

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
  }: {
    theme: Theme;
    specifierMap: SpecifierMap;
    globalModifierMap: Record<string, GlobalModifier>;
    localModifierMap: Record<string, LocalModifier>;
    separator: string;
    token: string;
  },
): ExecuteResult | undefined {
  const hasDefinedGlobalModifiers = globalModifiers.every((modifier) =>
    has(modifier, globalModifierMap)
  );
  const hasDefinedLocalModifiers = localModifiers.every((modifier) =>
    has(modifier, localModifierMap)
  );
  if (!hasDefinedGlobalModifiers || !hasDefinedLocalModifiers) return;
  const maybeCSSObject = resolveMap(specifier, {
    theme,
    specifierMap,
    separator,
  });

  if (!maybeCSSObject) return;

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
  const [cssObject, { combinator }] = maybeCSSObject;

  return {
    cssObject,
    combinator,
    selector: specifier,
    globalModifierHandlers,
    localModifierHandlers,
    specifier,
    token,
  };
}

/** Generate CSS Sheet as string */
export function generate(
  {
    separator = "-",
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
        },
      );

      return result;
    }).filter(Boolean) as ExecuteResult[];

    if (isLength0(executeResults)) {
      unmatched.add(token);
    }
    return executeResults;
  }).flat();

  const styles = results.map(
    (
      {
        cssObject,
        globalModifierHandlers,
        localModifierHandlers,
        token,
        combinator,
      },
    ) => {
      const maybeCSSObject = localModifierHandlers.reduce(
        (acc, [key, handler]) => {
          if (!acc) return;
          return handler(acc, { theme, modifier: key });
        },
        cssObject as CSSObject | undefined,
      );
      if (!maybeCSSObject) return;

      const declaration = cssDeclarationBlock(maybeCSSObject);

      const escapedSelector = `.${escapeRegExp(token)}`;

      const _head = head(globalModifierHandlers);
      if (!_head) {
        return `${escapedSelector}${combinator}${declaration}`;
      }
      const [modifier, handler] = _head;

      const {
        declaration: _declaration = declaration,
        selector: _selector = escapedSelector,
        ruleSet: _ruleSet,
      } = handler({
        selector: escapedSelector,
        declaration,
      }, { theme, modifier });

      const serialized = `${_selector}${combinator}${_declaration}`;
      return _ruleSet?.(serialized) ?? serialized;
    },
  ).filter(Boolean) as string[];

  return { css: styles.join("\n"), matched, unmatched };
}
