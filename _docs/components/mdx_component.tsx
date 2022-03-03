import React from "react";
import { MDXComponents } from "https://esm.sh/@types/mdx/types.d.ts";
import { clsx, isString } from "../deps.ts";

function HashAnchor({ href }: { href: string }) {
  return (
    <a
      className="absolute -ml-10 flex items-center opacity-0 border-0 transition-opacity duration-200 group-hover:opacity-100"
      area-label="Anchor"
      href={href}
    >
      <div className="w-6 h-6 text-slate-400 ring-1 ring-slate-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-slate-900/10 hover:shadow hover:text-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:shadow-none dark:ring-0">
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
  );
}

export const components: MDXComponents = {
  h1: (props) => {
    return <h1 {...props}></h1>;
  },
  h2: ({ children, id, ...rest }) => {
    const $id = `#${id}`;
    return (
      <h2
        className="group flex whitespace-pre-wrap mb-2 text-sm leading-6 text-sky-500 font-semibold tracking-normal dark:text-sky-400"
        id={id}
        {...rest}
      >
        <HashAnchor href={$id} />
        <span>{children}</span>
      </h2>
    );
  },
  h3: ({ children, id, ...rest }) => {
    const $id = `#${id}`;
    return (
      <h3
        className="group flex whitespace-pre-wrap leading-6 font-semibold mt-7"
        id={id}
        {...rest}
      >
        <HashAnchor href={$id} />
        <span>{children}</span>
      </h3>
    );
  },
  p: (props) => <p className="my-[1em] leading-7" {...props} />,
  pre: (props) => {
    return <pre className="mt-2 mb-[3.5em]" {...props} />;
  },
  code: ({ className, ...rest }) => {
    if (isString(rest.children)) {
      return (
        <code
          className="bg-gray-100 dark:bg-dark-100 px-1 py-0.5 rounded"
          {...rest}
        />
      );
    }
    return (
      <code
        className={clsx(
          `sm:rounded-xl shadow-sm text-sm font-[Fira_Code_VF,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation_Mono,Courier_New,monospace] ring-1 ring-inset ring-white/10`,
          className,
        )}
        {...rest}
      >
      </code>
    );
  },
  hr: (props) => <hr {...props} className="border-gray-200 my-[2em]" />,
};
