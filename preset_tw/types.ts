export type Option = {
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
