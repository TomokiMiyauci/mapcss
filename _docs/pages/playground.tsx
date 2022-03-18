import React, { useEffect, useMemo, useState } from "react";
import Editor from "https://esm.sh/@monaco-editor/react?pin=v69";
import root from "https://esm.sh/react-shadow";
import useDebounce from "~/hooks/use_debounce.ts";
import useColorModeValue from "~/hooks/use_color_mode_value.ts";
import { Header } from "~/components/header.tsx";
import { clsx } from "~/deps.ts";
import { Tab } from "https://esm.sh/@headlessui/react@1.5.0?pin=v69";
import { CODE, RAW_CONFIG } from "~/utils/code.ts";

import type { editor } from "https://esm.sh/monaco-editor";

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  fontFamily: `Menlo, Monaco, 'Courier New', monospace`,
  fontLigatures: true,
  fontSize: 14,
  minimap: { enabled: false },
  tabSize: 2,
};

export default function Playground() {
  const [input, setInput] = useState<string | undefined>(CODE);
  const [cssSheet, setCSSSheet] = useState("");
  const [rawConfig, setRawConfig] = useState<string | undefined>(
    RAW_CONFIG,
  );

  const theme = useColorModeValue("light", "vs-dark");
  const cssStyle = useMemo(() => {
    if (!window.CSSStyleSheet || !cssSheet) return;
    const style = new CSSStyleSheet();
    style.replaceSync(cssSheet);

    return style;
  }, [cssSheet]);

  const queryWorker = () => {
    const ws = new Worker("./worker.js");
    ws.onmessage = ({ data }) => {
      setCSSSheet(data);
      ws.terminate();
    };
    ws.postMessage({ code: input, rawConfig });
  };

  useEffect(queryWorker, [input]);

  useDebounce(
    queryWorker,
    { delay: 3000 },
    [rawConfig],
  );

  return (
    <>
      <style>
        {`body > #__aleph {height: 100vh}`}
      </style>
      <Header />
      <main className="h-[calc(100%_-_61px)] grid lg:grid-cols-2 overflow-hidden">
        <div className="h-full flex flex-col">
          <Tab.Group>
            <Tab.List className="py-1 px-4 space-x-2 shadow">
              <Tab
                className={({ selected }) =>
                  clsx({ "text-amber-500": selected })}
              >
                HTML
              </Tab>
              <Tab
                className={({ selected }) =>
                  clsx({ "text-amber-500": selected })}
              >
                Config
              </Tab>
              <Tab
                className={({ selected }) =>
                  clsx({ "text-amber-500": selected })}
              >
                CSS
              </Tab>
            </Tab.List>
            <Tab.Panels className="flex-1">
              <Tab.Panel className="h-full">
                <Editor
                  options={{
                    ...editorOptions,
                  }}
                  loading={<></>}
                  defaultLanguage="html"
                  onChange={setInput}
                  defaultValue={CODE}
                  value={input}
                  theme={theme}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <Editor
                  options={editorOptions}
                  loading={<></>}
                  defaultLanguage="typescript"
                  onChange={setRawConfig}
                  value={rawConfig}
                  theme={theme}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <Editor
                  options={{
                    ...editorOptions,
                    readOnly: true,
                  }}
                  loading={<></>}
                  defaultLanguage="css"
                  value={cssSheet}
                  theme={theme}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {cssStyle && input && (
          <root.div
            mode="closed"
            styleSheets={[cssStyle]}
            className="hidden lg:block"
          >
            <div
              className="whitespace-pre antialiased overflow-scroll grid place-content-center"
              dangerouslySetInnerHTML={{ __html: input }}
            >
            </div>
          </root.div>
        )}
      </main>
    </>
  );
}
