import { depsProse } from "./prose.ts";
import type { CSSMap } from "../../core/types.ts";
import type { PresetOption } from "../types.ts";

export function dependency({ css, className }: PresetOption): CSSMap {
  const cssMap: CSSMap = {
    [className]: depsProse({ css, className }),
  };
  return cssMap;
}
