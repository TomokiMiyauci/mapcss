import { Config, generate, presetMini } from "../../mod.ts";
import type { Plugin } from "aleph/types";

export const mapcssPlugin: Plugin = {
  name: "mapcss-loader",
  setup: (aleph) => {
    const config: Partial<Config> = {
      presets: [presetMini()],
    };

    aleph.onTransform(/\.(j|t)sx$/i, async ({ module, code, bundleMode }) => {
      const { specifier, jsxStaticClassNames } = module;
      if (!jsxStaticClassNames) return;
      const url = specifier.replace(/\.(j|t)sx$/i, "") + ".map.css";
      const css = generate(
        config,
        new Set((jsxStaticClassNames ?? []).join(" ").split(" ")),
      );
      const cssModule = await aleph.addModule(`${url}`, css, true);
      return {
        code: `import "${
          aleph.resolveImport(cssModule, specifier, bundleMode, true)
        }";\n${code}`,
        // support SSR
        extraDeps: [{ specifier: url, virtual: true }],
      };
    });
  },
};
