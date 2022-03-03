import React, { useMemo } from "react";
import { useDeno, useRouter } from "aleph/react";
import { getNavMenu, Nav, NavMenu } from "../_utils.ts";
import { Header } from "../components/header.tsx";
import { MDXContent } from "https://esm.sh/@types/mdx/types.d.ts";
import { components } from "~/components/mdx_component.tsx";
import type { TableOfContents } from "https://deno.land/x/aleph_plugin_mdx@v1.3.0-beta.1/mod.ts";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/nord.min.css";

type DocsProps = {
  Page?: MDXContent;
  pageProps: {
    meta: {
      title: string;
      description: string;
      category: string;
    };
    navMenu?: NavMenu[];
    tableOfContents?: TableOfContents;
  };
};

function Toc({ tableOfContents }: { tableOfContents?: TableOfContents }) {
  return tableOfContents?.items?.length
    ? (
      <ul className="text-slate-700 text-sm leading-6">
        {tableOfContents.items.map((item) => {
          return (
            <li key={item.title}>
              <a
                className="block py-1 font-medium hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                href={item.url}
              >
                {item.title}
              </a>
              {item.items?.length ? <Toc tableOfContents={item} /> : null}
            </li>
          );
        })}
      </ul>
    )
    : null;
}

export default function Docs({ Page, pageProps }: DocsProps) {
  if (!Page) return <></>;
  const { routePath } = useRouter();

  const navMenu = useDeno(async () => {
    return await getNavMenu();
  });
  const { prev, next } = useMemo(() => {
    const flatNav = navMenu.map(({ items }) => items).flat();
    const currentIndex = flatNav.findIndex(({ href }) => href === routePath);
    const prev = flatNav[currentIndex - 1] as Nav | undefined;
    const next = flatNav[currentIndex + 1] as Nav | undefined;
    return { prev, next };
  }, [navMenu]);

  const { title, description, category } = pageProps?.meta ??
    { title: "", description: "", category: "" };

  return (
    <>
      <Header />
      <div className="max-w-8xl lg:px-8 mx-auto">
        <aside className="hidden lg:block float-left h-[calc(100vh_-_3.8125rem)] sticky top-[3.8125rem] w-[19.5rem] pb-10 px-8 overflow-y-auto">
          <nav className="lg:text-sm lg:leading-6 relative">
            <ul>
              {navMenu.map(({ name, items }) => {
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
        <aside className="sticky float-right h-[calc(100vh_-_3.8125rem)] top-[3.8125rem] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
          <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
            On this page
          </h5>

          <Toc tableOfContents={pageProps.tableOfContents} />
        </aside>
        <div className="lg:ml-80 xl:mr-80">
          <main className="max-w-3xl mx-auto mx-4 pt-10 xl:max-w-none xl:ml-0 xl:px-8">
            <article className="prose">
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
                  components={components}
                />
              </section>
            </article>
            <aside className="my-10">
              <nav>
                <ul className="flex mb-10 text-slate-700 text-sm font-semibold flex items-center dark:text-slate-200 justify-between">
                  {prev && (
                    <li className="justify-self-start">
                      <a className="group space-x-2" href={prev.href}>
                        <span className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 i-mdi-arrow-left" />
                        <span>{prev.title}</span>
                      </a>
                    </li>
                  )}
                  {next && (
                    <li className="justify-self-end">
                      <a
                        className="group space-x-2 flex items-center"
                        href={next.href}
                      >
                        <span>
                          {next.title}
                        </span>
                        <span className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 i-mdi-arrow-right" />
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

// function walkMap(component: ReactNode): JSX.Element[] {
//   if (!isValidElement(component)) return [];
//   if (component.type === "h2") {
//     return [component];
//   }

//   const va = Children.map(
//     component.props.children as ReactNode,
//     (el) => el,
//   )?.filter(isValidElement);
//   if (!va) return [];

//   return va.map((f) => {
//     return walkMap(f);
//   }).filter(Boolean).filter((f) => Array.isArray(f) ? f.length : true).flat();
// }
