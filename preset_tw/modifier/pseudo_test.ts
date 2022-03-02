import { createContext, TestCase } from "./_test.ts";
import { pseudoHandler } from "./pseudo.ts";

const decl = { display: "block" };
const context = createContext({
  modifier: "hover",
});

const hoverModifier = pseudoHandler(":hover");

export const pseudo: TestCase = [
  [
    { block: decl },
    { "block:hover": decl },
    hoverModifier,
    context,
  ],
  [
    decl,
    decl,
    hoverModifier,
    context,
  ],
  [
    { "*, body": decl },
    { "*:hover, body:hover": decl },
    hoverModifier,
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
    hoverModifier,
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
    hoverModifier,
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
    hoverModifier,
    context,
  ],
];
