export type CSSObject = Record<string, string | number>;

export interface MapperContext {
  theme: Theme;
  separator: string;
}

export type Mapper = RecordMapper | EntriesMapper;

export type RecordMapper = {
  [k: string]: CSSObject | Mapper;
};

export type RegExpMapperHandler = (
  arr: RegExpExecArray,
  context: MapperContext,
) => CSSObject | undefined;

export type EntriesMapper = (StringMapperSet | RegExpMapperSet)[];
export type RegExpMapperSet = [
  RegExp,
  | Mapper
  | RegExpMapperHandler,
];
export type StringMapperSet = [string | number, CSSObject | Mapper];

export type Preset = {
  name: string;
  mapperMap: MapperMap;
  theme: Theme;
  modifierMap: ModifierMap;
};

export interface ModifierContext {
  theme: Theme;
  modifier: string;
}

export interface ModifierResult {
  identifier: string;

  rule: string;

  selector: (selector: string) => string;
}

export type MapperMap = Record<string | number, Mapper | CSSObject>;

export interface Theme {
  [k: string | number]: string | Theme;
}

export interface Config {
  mapperMap: MapperMap;
  modifierMap: ModifierMap;
  theme: Theme;
  presets: Preset[];
  separator: string;
  syntaxes: Syntax[];
}

export type RuleSet = {
  selector: string;
  declaration: CSSObject;
};

export type SerializedRuleSet = Record<keyof RuleSet, string>;

export type AtRule = Partial<ModifierResult> & {
  children: RuleSet;
};

export type CSSStatement = RuleSet | AtRule;

export type GlobalModifierHandler = (
  serializedRuleSet: SerializedRuleSet,
  context: ModifierContext,
) => Partial<SerializedRuleSet & { ruleSet: (ruleSet: string) => string }>;

export type LocalModifierHandler = (
  cssObject: CSSObject,
  context: ModifierContext,
) => CSSObject | undefined;

export type GlobalModifier = {
  type: "global";
  handler: GlobalModifierHandler;
};

export type LocalModifier = {
  type: "local";
  handler: LocalModifierHandler;
};

export type ModifierMap = Record<
  string | number,
  GlobalModifier | LocalModifier
>;

type SyntaxContext = {
  token: string;
  globalModifierNames: string[];
  localModifierNames: string[];
  mapperRootNames: string[];
};
type ParseResult = {
  specifier: string;
  globalModifiers?: string[];
  localModifiers?: string[];
};

export type Syntax = (context: SyntaxContext) => ParseResult | undefined;
