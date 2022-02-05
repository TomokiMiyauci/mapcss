import mapcssPlugin from "./plugins/mapcss.ts";
import { presetTw } from "../mod.ts";
import { mdxPlugin } from "./plugins/mdx.ts";
import remarkFrontmatter from "https://cdn.skypack.dev/remark-frontmatter";
import { remarkMdxFrontmatter } from "https://esm.sh/remark-mdx-frontmatter";
import rehypeSlug from "https://esm.sh/rehype-slug@5";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5";
import type { Config } from "aleph/types";

export default <Config> {
  plugins: [
    mapcssPlugin({
      presets: [presetTw()],
      ext: ["tsx", "mdx"],
    }),
    mdxPlugin({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    }),
  ],
};
