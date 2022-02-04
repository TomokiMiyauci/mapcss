import { type Config as MapCSSConfig, generate } from "../../mod.ts";
import type { Plugin } from "aleph/types";

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
    setup(aleph) {
      const pattern = RegExp(`\.(${ext.join("|")})$`, "i");
      aleph.onTransform(
        pattern,
        async ({ module: { specifier }, code, bundleMode }) => {
          const url = specifier.replace(pattern, "") + ".map.css";
          const { css } = generate(
            rest,
            code,
          );
          if (!css.length) return;
          const cssModule = await aleph.addModule(url, css, true);
          const importPath = aleph.resolveImport(
            cssModule,
            specifier,
            bundleMode,
          );
          return {
            code: `import "${importPath}";\n${code}`,
            // support SSR
            extraDeps: [{ specifier: url, virtual: true }],
          };
        },
      );
    },
  };
}
