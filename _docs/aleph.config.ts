import mapcssPlugin from "./plugins/mapcss.ts";
import { iconifyJSON, presetSvg, presetTw, presetTypography } from "../mod.ts";

import remarkFrontmatter from "https://cdn.skypack.dev/remark-frontmatter";
import { remarkMdxFrontmatter } from "https://esm.sh/remark-mdx-frontmatter";
import rehypeSlug from "https://esm.sh/rehype-slug@5";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5";
import {
  mdx,
  remarkFrontmatterProps,
  remarkTocProps,
} from "https://deno.land/x/aleph_plugin_mdx@v1.3.0-beta.1/mod.ts";
import mdi from "https://esm.sh/@iconify-json/mdi/icons.json" assert {
  type: "json",
};
import {
  Config as MapcssConfig,
  filterDeclaration,
  generate,
  ModifierDefinition,
} from "@mapcss/mod.ts";
import { AtRule, chain, toObject } from "@mapcss/deps.ts";
import { isAtRule, isRule } from "@mapcss/core/utils/assert.ts";
import type { Config } from "aleph/types";

const supportBackdropBlur: ModifierDefinition = (root) => {
  root.walk((node) => {
    if (isAtRule(node) || isRule(node)) {
      const atRule = new AtRule({
        name: "supports",
        params:
          "(backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))",
        nodes: [node],
      });
      node.replaceWith(atRule);
    }
  });
  return root;
};

const base: MapcssConfig = {
  modifierMap: {
    supports: {
      backdrop: {
        blur: supportBackdropBlur,
      },
    },
  },
  preset: [
    presetTw({
      darkMode: "class",
    }),
    presetTypography({
      css: {
        h2: {
          lineHeight: false,
        },
        pre: {
          padding: false,
        },
        "code, pre": {
          background: false,
        },
        code: {
          color: false,
        },
        ":not(pre) > code::before, :not(pre) > code::after": false,
      },
    }),
    presetSvg({
      svgMap: {
        mdi: iconifyJSON(mdi),
      },
      declaration: {
        display: "inline-block",
        verticalAlign: "middle",
      },
    }),
  ],
};

const config: MapcssConfig = {
  ...base,
  css: {
    ".dark": {
      ...chain(generate("bg-dark-900 text-slate-50", base).ast).map(
        filterDeclaration,
      ).map(
        toObject,
      ).unwrap(),
    },
  },
  cssMap: {
    max: {
      w: {
        "8xl": {
          maxWidth: "90rem",
        },
      },
    },
  },
};

export default <Config> {
  ssr: {
    exclude: [/\/playground/],
  },
  plugins: [
    mapcssPlugin({
      ...config,
      ext: ["tsx", "mdx"],
    }),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkFrontmatterProps,
        remarkTocProps,
      ],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
      rewritePagePath: (path) => path.replaceAll("_", "-"),
    }),
  ],
};
