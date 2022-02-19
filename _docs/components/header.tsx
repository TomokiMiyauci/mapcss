import React from "react";

export function Header() {
  return (
    <header className="sticky top-0 w-full backdrop-blur flex-none transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
      <div className="max-w-8xl container mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <a href="/" className="font-semibold text-xl">MapCSS</a>
        </div>
      </div>
    </header>
  );
}
