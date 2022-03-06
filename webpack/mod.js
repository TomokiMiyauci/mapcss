const { RawSource } = require("webpack-sources");
const { generate, extractSplit } = require("@mapcss/core");
const { presetTw } = require("@mapcss/preset-tw");
const { resolve } = require("path");
const contentSnapshot = require("./store");

const PLUGIN = "mapcss/plugin";
const OUTPUT_NAME = "map.css";

/** @type import('webpack').WebpackPluginInstance */
class MapcssPlugin {
  apply(compiler) {
    const tokens = new Set();

    // from constructor
    const config = { preset: [presetTw()] };
    const defaultTarget = [
      /\.[jt]sx$/,
      /\.mdx?$/,
      /\.vue$/,
      /\.vue\?vue/,
      /\.svelte$/,
      /\.astro$/,
      /\.elm$/,
    ];

    compiler.options.module.rules.push({
      include(id) {
        return defaultTarget.some((target) => target.test(id));
      },
      loader: resolve("./loader.cjs"),
    });
    compiler.hooks.compilation.tap(PLUGIN, (compilation) => {
      compilation.hooks.finishModules.tap(PLUGIN, (modules) => {
        for (const module of modules) {
          const content = contentSnapshot.get(module);
          if (!content) continue;

          const candidates = extractSplit(content);
          candidates.forEach((token) => {
            tokens.add(token);
          });
        }
      });

      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const { css } = generate(config, tokens);
          if (css) {
            compilation.emitAsset(OUTPUT_NAME, new RawSource(css));
          }
        }
      );
    });
  }
}

module.exports = MapcssPlugin;
