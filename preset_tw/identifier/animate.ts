import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSDefinition, CSSMap } from "../../core/types.ts";

export const animate: CSSMap = {
  none: { animation: "none" },
  spin: (_, { className, key }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${key} 1s linear infinite`,
        },
        [`@keyframes ${key}`]: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    };
    return value;
  },
  ping: (_, { className, key }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${key} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
        },
        [`@keyframes ${key}`]: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
    };
    return value;
  },
  pulse: (_, { className, key }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${key} 2s cubic-bezier(0.4,0,0.6,1) infinite`,
        },
        [`@keyframes ${key}`]: {
          "50%": {
            opacity: .5,
          },
        },
      },
    };
    return value;
  },
  bounce: (_, { className, key }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${key} 1s infinite`,
        },
        [`@keyframes ${key}`]: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
    };
    return value;
  },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ animation: arbitrary })],
    ]),
};
