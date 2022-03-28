import type { GenerateConfig, Labeled } from "../core/mod.ts";
// deno-lint-ignore no-unused-vars
import type { SimpleExtractor } from "./extractor.ts";

export type Extractor = Labeled & {
  fn: (code: string) => Set<string>;
};

export type Resource = {
  url: string;
  resolve: (url: string) => undefined | string | Promise<string | undefined>;
};

export type Importer = (url: string) => Promise<unknown>;

export type InputConfig = {
  /** Define resource location and how to resolve */
  resource?: Resource;

  /** Token extractor
   * @default {@link SimpleExtractor}
   */
  extractor?: Extractor;
};
export type OutputConfig = GenerateConfig;

export type IOConfig = {
  inputConfig: InputConfig;
  outputConfig: GenerateConfig;
};

export type Config = InputConfig & GenerateConfig;
