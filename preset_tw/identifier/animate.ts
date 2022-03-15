import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSDefinition, CSSMap } from "../../core/types.ts";

export const animate: CSSMap = {
  none: { animation: "none" },
  spin: (match, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${match} 1s linear infinite`,
        },
        [`@keyframes ${match}`]: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    };
    return value;
  },
  ping: (match, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${match} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
        },
        [`@keyframes ${match}`]: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
    };
    return value;
  },
  pulse: (match, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${match} 2s cubic-bezier(0.4,0,0.6,1) infinite`,
        },
        [`@keyframes ${match}`]: {
          "50%": {
            opacity: .5,
          },
        },
      },
    };
    return value;
  },
  bounce: (match, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${match} 1s infinite`,
        },
        [`@keyframes ${match}`]: {
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
