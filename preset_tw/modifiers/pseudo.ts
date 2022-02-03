import type { ModifierHandler } from "./../../core/types.ts";

export const pseudo: ModifierHandler = ({ selector }, { modifier }) => ({
  selector: `${selector}:${modifier}`,
});
