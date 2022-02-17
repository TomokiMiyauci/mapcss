import React, { type ComponentType, ReactElement } from "react";
import type { NavMenu } from "../plugins/mdx.ts";
import { Header } from "../components/header.tsx";
import { MDXContent } from "https://esm.sh/@types/mdx/types.d.ts";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark-dimmed.min.css";

type Mdx = {
  meta?: {
    title?: string;
    description?: string;
    category?: string;
  };
  nav?: NavMenu[];
};

type DocsProps = {
  Page?: MDXContent & Mdx;
};

export default function Docs({ Page }: DocsProps) {
  if (!Page) return <></>;

  const { title, description, category } = Page?.meta ??
    { title: "", description: "", category: "" };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <aside className="hidden lg:block float-left h-[calc(100vh_-_3.8125rem)] sticky top-[3.8125rem] w-[19.5rem] pb-10 px-8 overflow-y-auto">
          <nav className="lg:text-sm lg:leading-6 relative">
            <ul>
              {Page.nav?.map(({ name, items }) => {
                return (
                  <li className="mt-12 lg:mt-8" key={name}>
                    <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
                      {name}
                    </h5>

                    <ul className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                      {items.map(({ title, href }) => (
                        <li key={href}>
                          <a
                            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                            data-active-className="text-sky-500 border-current font-semibold dark:text-sky-400 hover:text-red-500"
                            href={href}
                            rel="nav"
                          >
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <aside className="sticky float-right z-20 h-[calc(100vh_-_3.8125rem)] top-[3.8125rem] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
          <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
            On this page
          </h5>

          <ul className="text-slate-700 text-sm leading-6">
          </ul>
        </aside>
        <div className="lg:ml-80 xl:mr-80">
          <main className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:pr-16">
            <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">
              {category}
            </p>
            <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
              {title}
            </h1>
            <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
              {description}
            </p>
            <section className="mt-10">
              <Page
                components={{
                  h2: ({ children, id }) => {
                    return (
                      <h2
                        className="group flex whitespace-pre-wrap -ml-4 pl-4 mb-2 text-sm leading-6 text-sky-500 font-semibold tracking-normal dark:text-sky-400"
                        id={id}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, id }) => {
                    return (
                      <h3 className="group flex whitespace-pre-wrap -ml-4 pl-4">
                        {children}
                      </h3>
                    );
                  },
                  pre: ({ children }) => {
                    return (
                      <pre className="mt-2">
                        {children}
                      </pre>
                    );
                  },
                }}
              />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
