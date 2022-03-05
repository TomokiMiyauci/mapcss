import React, { FC } from "react";
import "mapcss/reset/tw.css";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
) {
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
      <script>
        {`
            const theme = localStorage.getItem("theme");
            if (
              theme === "dark" ||
              (theme === null &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
              document.documentElement.classList.add("dark", "changing-theme");
            } else {
              document.documentElement.classList.remove("dark", "changing-theme");
            }
          `}
      </script>
      <Page {...pageProps} />
    </>
  );
}
