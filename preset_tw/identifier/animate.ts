import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSDefinition, CSSMap } from "../../core/types.ts";

export const animate: CSSMap = {
  none: { animation: "none" },
  spin: ({ id }, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${id} 1s linear infinite`,
        },
        [`@keyframes ${id}`]: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    };
    return value;
  },
  ping: ({ id }, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${id} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
        },
        [`@keyframes ${id}`]: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
    };
    return value;
  },
  pulse: ({ id }, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${id} 2s cubic-bezier(0.4,0,0.6,1) infinite`,
        },
        [`@keyframes ${id}`]: {
          "50%": {
            opacity: .5,
          },
        },
      },
    };
    return value;
  },
  bounce: ({ id }, { className }) => {
    const value: CSSDefinition = {
      type: "css",
      value: {
        [className]: {
          animation: `${id} 1s infinite`,
        },
        [`@keyframes ${id}`]: {
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
  "*": ({ id }) =>
    execMatch(id, [
      [reBracket_$, ([, arbitrary]) => ({ animation: arbitrary })],
    ]),
};
