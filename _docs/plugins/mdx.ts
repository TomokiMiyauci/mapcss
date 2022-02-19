import type {
  Plugin,
} from "https://deno.land/x/aleph@v0.3.0-beta.19/types.d.ts";
import util from "https://deno.land/x/aleph@v0.3.0-beta.19/shared/util.ts";
import { safeLoadFront } from "https://esm.sh/yaml-front-matter@4.1.1";
import {
  compile,
  CompileOptions,
} from "https://esm.sh/@mdx-js/mdx@2.0.0?pin=v66";

const pattern = /\.mdx$/i;

export function mdxPlugin(
  options: CompileOptions & { pageProps: Record<string | number, unknown> },
): Plugin {
  return {
    name: "mdx-loader",
    setup: (aleph) => {
      aleph.onResolve(pattern, (specifier) => {
        const path = util.trimSuffix(
          util.trimPrefix(specifier, "/pages"),
          ".mdx",
        ).replaceAll("_", "-");
        return { asPage: { path }, acceptHMR: true };
      });

      aleph.onLoad(pattern, async ({ specifier }) => {
        const { content } = await aleph.fetchModule(specifier);
        const { framework } = aleph.config;
        const source = new TextDecoder().decode(content);
        const { __content, ...meta } = safeLoadFront(
          source,
        );

        const { value } = await compile(source, options);

        if (framework !== "react") {
          throw new Error(
            `mdx-loader: don't support framework '${framework}'`,
          );
        }

        const props = { ...options.pageProps, meta };

        return {
          code: [
            value.toString(),
            `export const ssr = { props: () => { return ${
              JSON.stringify(props)
            }} };`,
          ].join("\n"),
        };
      });
    },
  };
}
