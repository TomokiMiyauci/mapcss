import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const list: CSSMap = {
  item: { display: "list-item" },
  none: { listStyleType: "none" },
  disc: { listStyleType: "disc" },
  decimal: { listStyleType: "decimal" },
  inside: { listStylePosition: "inside" },
  outside: { listStylePosition: "outside" },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, attr]) => ({ listStylePosition: attr })],
    ]),
};
