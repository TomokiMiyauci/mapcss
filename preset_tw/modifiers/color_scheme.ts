import type { ModifierHandler } from "./../../core/types.ts";

export const dark: ModifierHandler = ({ selector }, { modifier }) => ({
  selector: `.${modifier} ${selector}`,
});
