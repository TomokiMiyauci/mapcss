import { depsProse } from "./prose.ts";
import type { CSSMap } from "../../core/types.ts";
import type { PresetOptions } from "../types.ts";

export function dependency({ css }: PresetOptions): CSSMap {
  const cssMap: CSSMap = {
    prose: depsProse({ css: css ?? {} }),
  };
  return cssMap;
}
