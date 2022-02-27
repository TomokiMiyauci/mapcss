import { depsProse } from "./prose.ts";
import type { IdentifierMap } from "../../core/types.ts";
import type { PresetOptions } from "../types.ts";

export function dependency({ css }: PresetOptions): IdentifierMap {
  const identifierMap: IdentifierMap = {
    prose: depsProse({ css: css ?? {} }),
  };
  return identifierMap;
}
