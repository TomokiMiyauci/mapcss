import { bracket } from "./utils/unit.ts";
import type { CSSObject } from "./types.ts";

function asc(a: string, b: string): number {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}

export function cssDeclarationBlock(cssObject: Readonly<CSSObject>): string {
  const content = Object.entries(cssObject).sort(
    ([property], [nextProperty]) => asc(property, nextProperty),
  ).reduce((acc, [property, value]) => {
    const declaration = cssDeclaration({ property, value });
    return `${acc}${declaration}`;
  }, "");

  return bracket(content);
}

export function cssDeclaration(
  { property, value }: {
    property: string;
    value: string | number;
  },
  { middleSeparator = ":", endSeparator = ";" }: Partial<{
    middleSeparator: string;
    endSeparator: string;
  }> = {},
): string {
  return `${property}${middleSeparator}${value}${endSeparator}`;
}

export function constructVar(value: string, prefix = ""): string {
  return `--${prefix}${value}`;
}
