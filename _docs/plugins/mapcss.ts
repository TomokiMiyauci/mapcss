import { type Config as MapCSSConfig, generateStyleSheet } from "../../mod.ts";
import { extractSplit } from "../../core/extractor.ts";
import type { Plugin } from "aleph/types";
import { expandGlob, WalkEntry } from "https://deno.land/std@0.125.0/fs/mod.ts";

export type Config = Partial<MapCSSConfig> & {
  /** watch file type
   * @default ['tsx', 'jsx']
   */
  ext?: string[];
};

export default function mapcssPlugin(
  { ext = ["tsx", "jsx"], ...rest }: Config,
): Plugin {
  return {
    name: "mapcss-loader",
    async setup(aleph) {
      const pattern = RegExp(`\.(${ext.join("|")})$`, "i");
      if (aleph.mode === "development") {
        const baseModule = await aleph.addModule("/style/$map.css", " ");
        const tokens = new Set<string>([]);

        aleph.onTransform(/^\/app\.tsx$/, ({ code }) => {
          const path = aleph.resolveImport(baseModule, "/app.tsx");
          return {
            code: `import "${path}"\n${code}`,
            extraDeps: [{ specifier: "/style/$map.css", virtual: true }],
          };
        });

        aleph.onTransform(/^(.+)\.tsx|\.mdx$/, ({ code }) => {
          const _tokens = extractSplit(code);
          _tokens.forEach((token) => {
            tokens.add(token);
          });
          const { css, unmatched } = generateStyleSheet(rest, tokens);

          if (unmatched.size) {
            console.warn("unmatched");
            Array.from(unmatched).filter((v) => /^[a-z]/.test(v)).filter((v) =>
              /^[^\\\?]+$/.test(v)
            ).forEach((v) => console.log(v));
          }

          const _css = css ? css : " ";
          aleph.addModule("/style/$map.css", _css, true);
        });
      } else if (aleph.mode === "production") {
        const walkEntry = expandGlob("**/*.{tsx,mdx}");

        const paths = new Set<WalkEntry>();
        for await (const entry of walkEntry) {
          if (entry.isFile) {
            paths.add(entry);
          }
        }

        const texts = Array.from(paths).map(({ path }) =>
          Deno.readTextFileSync(path)
        );
        const allCode = texts.reduce((acc, cur) => `${acc}\n${cur}`, "");
        const { css } = generateStyleSheet(rest, allCode);
        if (!css) return;

        aleph.onRender(({ html }) => {
          html.head.push(`<style type="text/css">${css}</style>`);
        });
      }
    },
  };
}
