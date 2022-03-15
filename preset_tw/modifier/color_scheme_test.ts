import { createDark } from "./color_scheme.ts";
import { TestCase } from "./_test.ts";
import { createContext } from "../../utils/context.ts";
import { createMatchInfo } from "../../utils/context.ts";

const context = createContext();
const classDark = createDark("class");
const mediaDark = createDark("media");

export const colorScheme: TestCase = [
  [
    {
      "@media (min-width: 640px)": {
        ".sm:block": {
          display: "block",
        },
      },
    },
    {
      "@media (min-width: 640px)": {
        ".dark .sm:block": {
          display: "block",
        },
      },
    },
    classDark,
    createMatchInfo({ id: "dark" }),
    context,
  ],
  [
    {
      ".sm:block": {
        display: "block",
      },
      "*": {
        fontSize: 0,
      },
    },
    {
      ".dark .sm:block": {
        display: "block",
      },
      ".dark *": {
        fontSize: 0,
      },
    },
    classDark,
    createMatchInfo({ id: "dark" }),
    context,
  ],
  [
    {
      "@keyframes spin": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
    {
      "@keyframes spin": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
    classDark,
    createMatchInfo(),
    context,
  ],
  [
    {
      "@keyframes spin": {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      ".animate-spin": {
        animation: "spin 1s linear infinite",
      },
    },
    {
      "@media (prefers-color-scheme: dark)": {
        "@keyframes spin": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        ".animate-spin": {
          animation: "spin 1s linear infinite",
        },
      },
    },
    mediaDark,
    createMatchInfo(),
    context,
  ],
  [
    {
      animation: "spin 1s linear infinite",
    },
    {
      animation: "spin 1s linear infinite",
    },
    mediaDark,
    createMatchInfo(),
    context,
  ],
];
