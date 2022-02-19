import React from "react";
import { isDynamicRule, isStaticRule } from "mapcss/core/_utils.ts";
import type {
  CSSObject,
  DynamicRule,
  Rule,
  StaticRule,
} from "mapcss/core/types.ts";
import { theme } from "@tw/theme/mod.ts";

export type ClassTableProps = {
  rules: Rule[];
  samples: string[];
};

function stringifyCSSObject(cssObject: CSSObject): string {
  return Object.entries(cssObject).reduce((acc, [key, value]) => {
    return acc + `${key}: ${value}; `;
  }, "");
}

function ClassTable({ rules, samples = [] }: ClassTableProps) {
  const staticRules = rules.filter(isStaticRule) as StaticRule[];
  const dynamicRules = rules.filter(isDynamicRule) as DynamicRule[];
  const mixed = dynamicRules.reduce((acc, [regex, handler]) => {
    const _acc = acc.concat(regex);
    const results = samples.map((sample) => {
      const arr = regex.exec(sample);
      if (!arr) return;
      const maybeCSSObject = handler(arr, { theme });
      if (maybeCSSObject) return;

      return [sample, maybeCSSObject];
    }).filter(Boolean) as [string, CSSObject][];

    return _acc.concat(results);
  }, [] as (RegExp | [string, CSSObject])[]);

  return (
    <>
      <h2
        className="group flex whitespace-pre-wrap relative scroll-mt-[var(--scroll-mt)] -ml-4 pl-4"
        id="class-reference"
      >
        <a
          href="#class-reference"
          className="absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100"
          aria-label="Anchor"
        >
          ​<div className="w-6 h-6 text-slate-400 ring-1 ring-slate-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-slate-900/10 hover:shadow hover:text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:shadow-none dark:ring-0">
            <svg width="12" height="12" fill="none" aria-hidden="true">
              <path
                d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
              </path>
            </svg>
          </div>
        </a>
        <span>
          <span className="sr-only">Quick reference</span>
        </span>
      </h2>
      <div className="overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 supports-scrollbars:pr-2 lg:max-h-96">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
                  Class
                </div>
              </th>
              <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
                  Properties
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="align-baseline">
            {staticRules.map(([key, cssObject]) => {
              const style = stringifyCSSObject(cssObject);
              return (
                <tr key={key + style}>
                  <td className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">
                    {key}
                  </td>
                  <td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 sm:table-cell sm:pr-2">
                    {style}
                  </td>
                </tr>
              );
            })}
            {mixed.map((m) => {
              if (Array.isArray(m)) {
                return <></>;
              } else {
                return (
                  <tr key={m.toString()}>
                    <td
                      colSpan={2}
                      className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-yellow-500 whitespace-nowrap dark:text-yellow-400"
                    >
                      {m.toString()}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClassTable;
