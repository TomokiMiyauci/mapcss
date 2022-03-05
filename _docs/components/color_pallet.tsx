import React from "react";
import type { Theme } from "../../mod.ts";
import { clsx, filterValues, isObject } from "../deps.ts";

const not = "not-prose";

type Props = {
  className: string;
  color: Theme;
};

type ColorPalletProps = {
  prop: string;
  color: string;
};

function ColorPallet({ prop, color }: ColorPalletProps) {
  return (
    <>
      <div
        className="h-10 w-full rounded ring-1 ring-inset ring-slate-900/10 dark:ring-white/10"
        style={{ backgroundColor: color }}
      />
      <div className="font-medium text-xs text-slate-900 mt-1">{prop}</div>
      <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400">
        {color}
      </div>
    </>
  );
}

export default function ({ className, color }: Readonly<Props>) {
  const nestedPallet = filterValues(color, isObject) as Record<
    string,
    Record<string, string | number>
  >;

  return (
    <ul className={clsx(not, "grid grid-cols-1 gap-8", className)}>
      {Object.entries(nestedPallet).map(([key, value]) => {
        return (
          <li key={key} className={clsx(not, "sm:flex")}>
            <span className="font-medium text-slate-900 w-16 text-sm">
              {key}
            </span>
            <ul className="mt-3 sm:mt-0 min-w-0 flex-1 grid grid-cols-5 2xl:grid-cols-10 gap-x-3 sm:gap-x-4 gap-y-3 2xl:gap-x-2 not-prose">
              {Object.entries(value).map(([key, value]) => {
                return (
                  <li
                    key={key}
                    className="not-prose"
                  >
                    <ColorPallet prop={key} color={String(value)} />
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
