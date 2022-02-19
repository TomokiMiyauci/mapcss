import React from "react";

export default function Home() {
  return (
    <>
      <h1 className="text-slate-900 lg:block font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Rapidly build modern websites without ever leaving your HTML.
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        A utility-first CSS framework packed with classes like{" "}
        <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
          flex
        </code>,{" "}
        <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
          pt-4
        </code>,{" "}
        <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
          text-center
        </code>{" "}
        and{" "}
        <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
          rotate-90
        </code>{" "}
        that can be composed to build any design, directly in your markup.
      </p>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <a
          href="/docs/installation"
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          Get started
        </a>
      </div>
    </>
  );
}
