export type CSSObject = Record<string, string | number>;

export type ModifierHandler = (
  match: string,
  context: ModifierContext,
) => Partial<ModifierResult> | void;

export type StaticModifier = [
  string,
  ModifierHandler,
];

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

export type Modifier = StaticModifier;

export type Preset = {
  name: string;
  mapperMap: MapperMap;
  theme: Theme;
  modifiers: Modifier[];
};

export interface ModifierContext {
  theme: Theme;
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
  theme: Theme;
  presets: Preset[];
  separator: string;
}

export type RuleSet = {
  selector: string;
  declarationBlock: CSSObject;
};

export type AtRule = Partial<ModifierResult> & {
  children: RuleSet;
};

export type CSSStatement = RuleSet | AtRule;
