export function stringifyCustomProperty(
  property: string,
  prefix = "",
): string {
  return `--${prefix}${property}`;
}

export function stringifyVarFunction(value: string) {
  return `var(${value})`;
}
