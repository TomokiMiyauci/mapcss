import { depsProse } from "./prose.ts";
import type { SpecifierMap } from "../../core/types.ts";
import type { PresetOptions } from "../types.ts";

export function dependency({ css }: PresetOptions): SpecifierMap {
  const specifierMap: SpecifierMap = {
    prose: depsProse({ css: css ?? {} }),
  };
  return specifierMap;
}
