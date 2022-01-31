import { mapcssPlugin } from "./plugins/mapcss.ts";
import { mdxPlugin } from "./plugins/mdx.ts";
import type { Config } from "aleph/types";

export default <Config> {
  plugins: [mapcssPlugin, mdxPlugin()],
};
