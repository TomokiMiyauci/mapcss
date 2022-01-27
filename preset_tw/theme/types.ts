import type { Theme } from "../../core/types.ts";
export interface PresetTwTheme extends Theme {
  fontSize: Record<PropertyKey, [string, string]>;

  width: Record<PropertyKey, string | number>;

  lineHeight: Record<PropertyKey, string | number>;
}
