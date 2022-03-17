import React, { FC, useEffect, useState } from "react";
import { DarkModeContext } from "~/contexts/mod.ts";
import "mapcss/reset/tw.css";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
) {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    const media = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (
      theme === "dark" ||
      (theme === null &&
        media)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setDark(theme === "dark" || media);
  }, []);

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <style>
          {`
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
        </style>
      </head>

      <DarkModeContext.Provider value={[isDark, setDark]}>
        <Page {...pageProps} />
      </DarkModeContext.Provider>
    </>
  );
}
