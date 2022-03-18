import React, { FC } from "react";
import { DarkModeContext, OverlayContext } from "~/contexts/mod.ts";
import useDarkMode from "~/hooks/use_dark_mode.ts";
import useNode from "~/hooks/use_node.ts";
import "mapcss/reset/tw.css";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
) {
  const [isDark, setDark] = useDarkMode();
  const [node, setNode] = useNode();

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
        <OverlayContext.Provider value={[node, setNode]}>
          <Page {...pageProps} />
        </OverlayContext.Provider>
      </DarkModeContext.Provider>

      {node}
    </>
  );
}
