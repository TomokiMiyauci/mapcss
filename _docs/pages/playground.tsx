import React, { useEffect, useMemo, useState } from "react";
import Editor from "https://esm.sh/@monaco-editor/react?pin=v65";
import root from "https://esm.sh/react-shadow";

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

export default function Playground() {
  const [input, setInput] = useState(code);
  const [cssSheet, setCSSSheet] = useState("");

  const cssStyle = useMemo(() => {
    if (!window.CSSStyleSheet || !cssSheet) return;
    const style = new CSSStyleSheet();
    style.replaceSync(cssSheet);

    return style;
  }, [cssSheet]);

  useEffect(() => {
    const ws = new Worker("./worker.js");
    ws.onmessage = ({ data }) => {
      setCSSSheet(data);
      ws.terminate();
    };
    ws.postMessage(input);
  }, [input]);

  return (
    <>
      <div className="grid h-screen grid-cols-2 overflow-hidden">
        <div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            defaultValue={code}
            defaultLanguage="html"
            loading={<></>}
            onChange={(input) => setInput(input ?? "")}
            height="70%"
          />
          <Editor
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
            }}
            loading={<></>}
            value={cssSheet}
            defaultLanguage="css"
            height="30%"
          />
        </div>

        {cssStyle && (
          <root.div
            mode="closed"
            styleSheets={[cssStyle]}
          >
            <div
              className="whitespace-pre antialiased overflow-scroll grid place-content-center"
              dangerouslySetInnerHTML={{ __html: input }}
            >
            </div>
          </root.div>
        )}
      </div>
    </>
  );
}
