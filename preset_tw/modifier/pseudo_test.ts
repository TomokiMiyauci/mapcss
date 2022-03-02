import { createContext, TestCase } from "./_test.ts";
import { pseudoHandler } from "./pseudo.ts";

const decl = { display: "block" };
const context = createContext({
  modifier: "hover",
});

export const pseudo: TestCase = [
  [
    { block: decl },
    { "block:hover": decl },
    pseudoHandler,
    context,
  ],
  [
    decl,
    decl,
    pseudoHandler,
    context,
  ],
  [
    { "*, body": decl },
    { "*:hover, body:hover": decl },
    pseudoHandler,
    context,
  ],
  [
    {
      "@media (min-width: 640px)": {
        ".sm:block": decl,
      },
    },
    {
      "@media (min-width: 640px)": {
        ".sm:block:hover": decl,
      },
    },
    pseudoHandler,
    context,
  ],
  [
    {
      "@media (min-width: 640px)": {
        ".sm:block": decl,
      },
      "@media (min-width: 840px)": {
        ".md:block": decl,
      },
    },
    {
      "@media (min-width: 640px)": {
        ".sm:block:hover": decl,
      },
      "@media (min-width: 840px)": {
        ".md:block:hover": decl,
      },
    },
    pseudoHandler,
    context,
  ],
  [
    {
      "@keyframe test": {
        to: {
          transform: "translateX(100%)",
        },
      },
    },
    {
      "@keyframe test": {
        to: {
          transform: "translateX(100%)",
        },
      },
    },
    pseudoHandler,
    context,
  ],
];
