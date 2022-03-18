import React from "react";
import ToggleDark from "~/components/toggle_dark.tsx";
import { clsx } from "~/deps.ts";
import useOverlay from "~/hooks/use_overlay.ts";

export function Header() {
  const [isShow, { toggle, off }] = useOverlay();
  return (
    <header className="sticky z-1 top-0 w-full backdrop-blur flex-none lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-dark-900/75">
      <div className="max-w-8xl lg:px-8 mx-auto">
        <div className="flex justify-between py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <a href="/" className="font-semibold text-xl">MapCSS</a>

          <div className="flex space-x-4 sm:space-x-8 items-center">
            <nav className="text-sm hidden sm:block leading-6 font-semibold text-slate-700 dark:text-slate-200">
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
              className="hidden sm:block text-slate-400 hover:text-slate-500 transition-colors duration-200"
              target="_blank"
              title="mapcss GitHub"
            >
              <span className="sr-only">MapCSS on GitHub</span>
              <span className="i-mdi-github w-6 h-6" />
            </a>

            <button
              onClick={() =>
                toggle(
                  <div
                    onClick={off}
                    className="fixed inset-0 z-2 backdrop-blur bg-opacity-50"
                  >
                    <nav className="w-4/5 max-w-xs border-r border-gray-50 dark:border-dark-300 min-w-xs h-full bg-white shadow dark:bg-dark-900 text-2xl p-4">
                      <ul>
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
                  </div>,
                )}
              className={clsx(
                "sm:hidden h-7 w-7 transition-all duration-300",
                isShow ? "i-mdi-close" : "i-mdi-menu",
              )}
            >
              <span className="sr-only">Menu button</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
