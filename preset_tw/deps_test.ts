import { expect, ParamReturn, test } from "../dev_deps.ts";
import { orderMediaQuery } from "./deps.ts";

test("orderMediaQuery", () => {
  const table: ParamReturn<typeof orderMediaQuery>[] = [
    ["screen and (max-width: 640px)", "screen and (min-width: 980px)", 1],
  ];

  table.forEach(([a, b, result]) => expect(orderMediaQuery(a, b)).toBe(result));
});

test("sort with orderMediaQuery ordered mobile first", () => {
  const table: [string[], string[]][] = [
    [[
      "screen and (max-width: 640px)",
      "screen and (min-width: 980px)",
      "screen and (max-width: 980px)",
      "screen and (max-width: 768px)",
      "screen and (min-width: 640px)",
      "screen and (min-width: 1280px)",
      "screen and (min-width: 768px)",
      "screen and (max-width: 1280px)",
    ], [
      "screen and (min-width: 640px)",
      "screen and (min-width: 768px)",
      "screen and (min-width: 980px)",
      "screen and (min-width: 1280px)",
      "screen and (max-width: 1280px)",
      "screen and (max-width: 980px)",
      "screen and (max-width: 768px)",
      "screen and (max-width: 640px)",
    ]],
    [[
      "screen and (max-width: 640px)",
      "screen and (max-width: 640px)",
      "screen and (min-width: 1280px)",
      "screen and (max-width: 640px)",
    ], [
      "screen and (min-width: 1280px)",
      "screen and (max-width: 640px)",
      "screen and (max-width: 640px)",
      "screen and (max-width: 640px)",
    ]],
    [[
      "tv",
      "print and (orientation: landscape)",
      "print and (orientation: portrait)",
      "print and (orientation: portrait)",
      "screen and (orientation: landscape)",
      "print",
      "screen and (orientation: portrait)",
      "print and (orientation: landscape)",
      "print and (orientation: portrait)",
    ], [
      "screen and (orientation: landscape)",
      "screen and (orientation: portrait)",
      "tv",
      "print",
      "print and (orientation: landscape)",
      "print and (orientation: landscape)",
      "print and (orientation: portrait)",
      "print and (orientation: portrait)",
      "print and (orientation: portrait)",
    ]],
    [[
      "tv",
      "print and (orientation: landscape)",
      "screen and (min-width: 1280px)",
      "screen and (max-width: 640px)",
      "screen and (orientation: landscape)",
      "print",
      "screen and (orientation: portrait)",
      "screen and (min-width: 768px)",
      "screen and (max-width: 1280px)",
      "print and (orientation: portrait)",
    ], [
      "screen and (min-width: 768px)",
      "screen and (min-width: 1280px)",
      "screen and (max-width: 1280px)",
      "screen and (max-width: 640px)",
      "screen and (orientation: landscape)",
      "screen and (orientation: portrait)",
      "tv",
      "print",
      "print and (orientation: landscape)",
      "print and (orientation: portrait)",
    ]],
    [[
      `@media (min-width: 48em)
         and (max-width: 59.999em)`,
      `@media (min-width: 40em)
         and (max-width: 47.999em)`,
      `@media (min-width: 15em)
         and (max-width: 47.999em)`,
      `@media (min-width: 2em)
         and (max-width: 47.999em)`,
      `@media (min-width: 20em)
         and (max-width: 47.999em)`,
      `@media (min-width: 3em)
         and (max-width: 48.999em)`,
      `@media (min-width: 31em)
         and (max-width: 48.999em)`,
    ], [
      `@media (min-width: 2em)
         and (max-width: 47.999em)`,
      `@media (min-width: 3em)
         and (max-width: 48.999em)`,
      `@media (min-width: 15em)
         and (max-width: 47.999em)`,
      `@media (min-width: 20em)
         and (max-width: 47.999em)`,
      `@media (min-width: 31em)
         and (max-width: 48.999em)`,
      `@media (min-width: 40em)
         and (max-width: 47.999em)`,
      `@media (min-width: 48em)
         and (max-width: 59.999em)`,
    ]],
    [[
      `

      @media (min-width: 48em)


         and (max-width: 59.999em)

         `,
      `


                @media (min-width: 40em)

         and (max-width: 47.999em)


         `,
      `



      @media (min-width: 15em)



         and (max-width: 47.999em)



         `,
    ], [
      `



      @media (min-width: 15em)



         and (max-width: 47.999em)



         `,
      `


                @media (min-width: 40em)

         and (max-width: 47.999em)


         `,
      `

      @media (min-width: 48em)


         and (max-width: 59.999em)

         `,
    ]],
  ];

  table.forEach(([a, b]) => expect(a.sort(orderMediaQuery)).toEqual(b));
});
