import type { Arrayable, ReplaceKeys } from "../deps.ts";

export type Tree<L, P extends PropertyKey = PropertyKey> = {
  [k in P]: L | Tree<L>;
};

export type CSSNestedModule = {
  [k: string]: CSSNestedModule | OrderedDeclarations;
};

export type SpecifierContext =
  & ThemeContext
  & {
    variablePrefix: string;
    token: string;
  };

export type ThemeContext = {
  theme: Theme;
  separator: string;
};

export type SpecifierHandler = (
  arr: RegExpExecArray,
  context: SpecifierContext,
) => Arrayable<Declaration> | Arrayable<CSSStatement> | undefined;

export type Preset = {
  name: string;
  specifierMap: SpecifierMap;
  theme: Theme;
  modifierMap: ModifierMap;
  syntaxes: Syntax[];
  postProcessor: PostProcessor[];
};

export type ModifierContext = ThemeContext & {
  modifier: string;
  path: string[];
};

export interface Theme {
  [k: string | number]: string | Theme;
}

export interface Config {
  specifierMap: SpecifierMap;
  modifierMap: ModifierMap;
  theme: Theme;
  presets: Preset[];
  separator: string;
  syntaxes: Syntax[];

  postProcess: PostProcessor[];

  /**
   * @default 'map-'
   */
  variablePrefix: string;

  /** Specifies a map of strings.
   * It is mainly used to reassign special characters.
   * @default charMap: { "_": " " }
   */
  charMap: Record<string, string>;
}

export type ModifierMap = Record<
  string | number,
  Modifier | ModifierDefinition
>;

export type SyntaxContext = {
  token: string;
  modifierRoots: string[];
  specifierRoots: string[];
};
export type ParseResult = {
  specifier: string;
  modifiers?: string[];
};

type Context = {
  variablePrefix: string;
};

export type Syntax = {
  name: string;
  fn: (context: SyntaxContext) => ParseResult | undefined;
};

export type PostProcessor = {
  name: string;
  fn: (
    cssStatements: CSSStatement[],
    context: Context,
  ) => CSSStatement[];

  /** order of processor */
  order?: number;
};

export type Declaration = Record<string, string | number>;
export type OrderedDeclarations = {
  property: string;
  value: string | number;
}[];

/** User definition of CSS Block Declaration */
export type BlockDefinition = Record<string, string>;

export type CSSStatement = GroupAtRule | RuleSet;

type BaseRule = {
  order?: number;
};

export type AtRule = {
  type: "atRule";
  identifier: string;
  rule?: string;
  children?: NestedRecord;
} & BaseRule;

type NestedRecord = {
  [k: string]: string | NestedRecord;
};

export type GroupAtRule = Required<
  ReplaceKeys<
    SpecifierGroupAtRule,
    "children",
    { children: GroupAtRule | RuleSet }
  >
>;

export type SpecifierGroupAtRule = {
  type: "groupAtRule";
  identifier: string;
  rule: string;
  children: SpecifierGroupAtRule | SpecifierRuleSet;
} & BaseRule;

export type RuleSet =
  & ReplaceKeys<
    Required<Omit<SpecifierRuleSet, "declaration">>,
    "selector",
    { selector: string }
  >
  & { declarations: OrderedDeclarations };

export type SpecifierRuleSet = {
  type: "ruleset";
  selector?: (selector: string) => string;
  declaration: Declaration;
} & BaseRule;

export type SpecifierMap = {
  [k in string | number]:
    | SpecifierDefinition
    | Specifier;
};

export type RecordSpecifier = {
  [k: string | number]:
    | SpecifierDefinition
    | Specifier;
};
export type EntriesSpecifier = [
  string | number | RegExp,
  | SpecifierDefinition
  | Specifier,
][];

export type SpecifierCSSStatement = SpecifierGroupAtRule | SpecifierRuleSet;

export type Specifier = RecordSpecifier | EntriesSpecifier;

export type EntriesModifier = [
  RegExp,
  (
    regExpExecArray: RegExpExecArray,
    cssStatement: CSSStatement,
    context: ModifierContext,
  ) => CSSStatement | undefined,
][];

export type RecordModifier = {
  [k: string]: ModifierDefinition;
};

export type Modifier = RecordModifier;
export type ModifierDefinition = (
  cssStatement: CSSStatement,
  context: ModifierContext,
) => CSSStatement | undefined;

export type SpecifierDefinition =
  | Arrayable<BlockDefinition>
  | Arrayable<SpecifierCSSStatement>
  | ((regExpExecArray: RegExpExecArray, context: SpecifierContext) =>
    | Arrayable<BlockDefinition>
    | Arrayable<SpecifierCSSStatement>
    | undefined);
