import type { Tree } from "../core/types.ts";

export interface PresetOptions {
  /**
   * Extend or override CSS Statement.
   *
   * @default undefined
   */
  css?: Tree<string | number>;
}
