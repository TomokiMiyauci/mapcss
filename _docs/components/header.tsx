import React from "react";
import ToggleDark from "~/components/toggle_dark.tsx";

export function Header() {
  return (
    <header className="sticky z-1 top-0 w-full backdrop-blur flex-none transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-dark-900/75">
      <div className="max-w-8xl lg:px-8 mx-auto">
        <div className="flex justify-between py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <a href="/" className="font-semibold text-xl">MapCSS</a>

          <div className="flex space-x-8 items-center">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
              <ul className="flex space-x-8">
                <li>
                  <a href="/docs/installation">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="/playground">
                    Playground
                  </a>
                </li>
              </ul>
            </nav>

            <ToggleDark />

            <a
              href="https://github.com/TomokiMiyauci/mapcss"
              className="text-slate-400 hover:text-slate-500 transition-colors duration-200"
              target="_blank"
              title="mapcss GitHub"
            >
              <span className="sr-only">MapCSS on GitHub</span>
              <span className="i-mdi-github w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
