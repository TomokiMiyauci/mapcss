import { type Config, generate, presetTw } from "../../mod.ts";
import type { Plugin } from "aleph/types";

export const mapcssPlugin: Plugin = {
  name: "mapcss-loader",
  setup: (aleph) => {
    const config: Partial<Config> = {
      presets: [presetTw()],
    };

    aleph.onTransform(/\.(j|t)sx$/i, async ({ module, code, bundleMode }) => {
      const { specifier, jsxStaticClassNames } = module;
      if (!jsxStaticClassNames) return;
      const url = specifier.replace(/\.(j|t)sx$/i, "") + ".map.css";
      const { css, unmatched } = generate(
        config,
        new Set((jsxStaticClassNames ?? []).join(" ").split(" ")),
      );
      if (unmatched.size) {
        unmatched.forEach((token) => console.log(token));
      }
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
