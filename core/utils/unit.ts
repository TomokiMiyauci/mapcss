export function px(value: string | number): string {
  return `${value}px`;
}

export function rem(value: string | number): string {
  return `${value}rem`;
}

export function percent(value: string | number): string {
  return `${value}%`;
}

export function bracket<T extends string>(value: T): `{${T}}` {
  return `{${value}}`;
}

export function paren<T extends string>(value: T): `(${T})` {
  return `(${value})`;
}

export function constructVar(value: string, prefix = ""): string {
  return `--${prefix}${value}`;
}
