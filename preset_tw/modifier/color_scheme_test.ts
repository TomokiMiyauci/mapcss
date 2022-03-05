import { createDark } from "./color_scheme.ts";
import { createContext, TestCase } from "./_test.ts";

const context = createContext({ modifier: "dark" });
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
    context,
  ],
];
