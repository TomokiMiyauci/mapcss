import React, { type ComponentType } from "react";
import type { NavMenu } from "../plugins/mdx.ts";
import { Header } from "../components/header.tsx";

type Mdx = {
  meta?: {
    title?: string;
    description?: string;
    category?: string;
  };
  nav?: NavMenu[];
};

type DocsProps = {
  Page?: ComponentType<any> & Mdx;
};

export default function Docs({ Page }: DocsProps) {
  const { title, description, category } = Page?.meta ??
    { title: "", description: "", category: "" };

  return (Page
    ? (
      <>
        <Header />
        <aside className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
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

        <div className="lg:pl-80">
          <main className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
            <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">
              {category}
            </p>
            <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
              {title}
            </h1>
            <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
              {description}
            </p>
            <section className="prose mt-10">
              <Page />
            </section>
          </main>
        </div>
      </>
    )
    : <></>);
}
