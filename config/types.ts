// This module is browser compatible.

import type { Labeled } from "../core/types.ts";
import type { Config as GenerateConfig } from "../core/generate.ts";
import type { Arrayable } from "./deps.ts";
// deno-lint-ignore no-unused-vars
import type { simpleExtractor } from "./extractor.ts";

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
   * @default {@link simpleExtractor}
   */
  extractor?: Arrayable<Extractor>;
};
export type OutputConfig = GenerateConfig;

export type IOConfig = {
  inputConfig: InputConfig;
  outputConfig: GenerateConfig;
};

export type Config = InputConfig & GenerateConfig;
