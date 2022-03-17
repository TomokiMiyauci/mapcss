import React, { useEffect, useMemo, useState } from "react";
import Editor from "https://esm.sh/@monaco-editor/react?pin=v65";
import root from "https://esm.sh/react-shadow";
import useDebounce from "~/hooks/use_debounce.ts";
import { Header } from "~/components/header.tsx";
import { clsx, Tab } from "~/deps.ts";

const code =
  `<div class="min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    <div class="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
      <div class="max-w-md mx-auto">
        <div class="divide-y divide-gray-300/50">
          <div class="py-8 text-base leading-7 space-y-6 text-gray-600">
            <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
            <ul class="space-y-4">
              <li class="flex items-center">
                <svg class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p class="ml-4">
              Customizing your
              <code class="text-sm font-bold text-gray-900">tailwind.config.js</code> file
            </p>
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p class="ml-4">
              Extracting classes with
              <code class="text-sm font-bold text-gray-900">@apply</code>
            </p>
          </li>
          <li class="flex items-center">
            <svg class="w-6 h-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p class="ml-4">Code completion with instant preview</p>
          </li>
        </ul>
        <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
      </div>
      <div class="pt-8 text-base leading-7 font-semibold">
        <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
        <p>
          <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
        </p>
      </div>
    </div>
  </div>
  </div>
</div>
`;

const defaultRawConfig = `// Changes have a debounce of 3000 ms.
// import { presetTw } from "https://deno.land/x/mapcss/mod.ts"

export default {
  // preset: [presetTw()]
  minify: false
}
`;

export default function Playground() {
  const [input, setInput] = useState<string | undefined>(code);
  const [cssSheet, setCSSSheet] = useState("");
  const [rawConfig, setRawConfig] = useState<string | undefined>(
    defaultRawConfig,
  );
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
                    minimap: {
                      enabled: false,
                    },
                  }}
                  loading={<></>}
                  defaultLanguage="html"
                  onChange={setInput}
                  defaultValue={code}
                  value={input}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <Editor
                  options={{
                    minimap: {
                      enabled: false,
                    },
                  }}
                  loading={<></>}
                  defaultLanguage="typescript"
                  onChange={setRawConfig}
                  value={rawConfig}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <Editor
                  options={{
                    minimap: {
                      enabled: false,
                    },
                    readOnly: true,
                  }}
                  loading={<></>}
                  defaultLanguage="css"
                  value={cssSheet}
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
