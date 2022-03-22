import type { GenerateConfig, Labeled } from "../core/mod.ts";
// deno-lint-ignore no-unused-vars
import type { SimpleExtractor } from "./extractor.ts";

export type Extractor = Labeled & {
  fn: (code: string) => Set<string>;
};

export type Config = {
  /** Define content source */
  content: string[];

  /** Token extractor
   * @default {@link SimpleExtractor}
   */
  extractor?: Extractor;
} & GenerateConfig;
