// This module is browser compatible.

export type Option = {
  /** Dark mode type
   *
   * `media`: use `@media` at-rule with `prefer-color-theme`
   *
   * `dark`: add `.dark` classSelector
   *
   * @default `media`
   */
  darkMode: "media" | "class";

  /** Inject reset CSS Statement or not.
   * @default false
   */
  preflight: boolean;

  /** Inject universal custom property(variable) or not.
   * In default, it inspects the declaration block and automatically injects variable globally.
   * @default true
   */
  injectVariable: boolean;
};
