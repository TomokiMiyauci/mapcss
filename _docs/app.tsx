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
      <Page {...pageProps} />
    </>
  );
}
