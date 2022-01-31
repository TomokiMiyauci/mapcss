export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number | undefined;
};

export function parseNumeric(value: string): number | undefined {
  const number = Number(value);
  if (Number.isNaN(number)) return;
  return number;
}

export function hex2RGBA(str: string): RGBA | undefined {
  const [, body] = str.match(/^#?([\da-f]+)$/i) || [];
  if (!body) {
    return;
  }

  switch (body.length) {
    case 3:
    case 4: {
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n) =>
        (n << 4) | n
      );
      const [r, g, b] = digits;
      return {
        r,
        g,
        b,
        a: body.length === 3
          ? undefined
          : Math.round(digits[3] / 255 * 100) / 100,
      };
    }

    case 6:
    case 8: {
      const value = Number.parseInt(body, 16);
      const [r, g, b] = body.length === 6
        ? [(value >> 16) & 0xFF, (value >> 8) & 0xFF, value & 0xFF]
        : [(value >> 24) & 0xFF, (value >> 16) & 0xFF, (value >> 8) & 0xFF];
      return {
        r,
        g,
        b,
        a: body.length === 6
          ? undefined
          : Math.round((value & 0xFF) / 255 * 100) / 100,
      };
    }
  }
}

export function parseFraction(
  numerator: string,
  denominator: string,
): number | undefined {
  const result = Number(numerator) / Number(denominator);

  if (!Number.isFinite(result)) return;
  return result;
}
