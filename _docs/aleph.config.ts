import mapcssPlugin from "./plugins/mapcss.ts";
import { presetTw, presetTypography } from "../mod.ts";
import { mdxPlugin } from "./plugins/mdx.ts";
import remarkFrontmatter from "https://cdn.skypack.dev/remark-frontmatter";
import { remarkMdxFrontmatter } from "https://esm.sh/remark-mdx-frontmatter";
import rehypeSlug from "https://esm.sh/rehype-slug@5";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5";
import { walkSync } from "https://deno.land/std@0.122.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.122.0/path/mod.ts";
import { safeLoadFront } from "https://esm.sh/yaml-front-matter@4.1.1";
import type { Config } from "aleph/types";

type Nav = {
  title: string;
  href: string;
};

export type NavMenu = {
  name: string;
  items: Nav[];
};

const entries = [...walkSync("./pages/docs", { exts: ["mdx"] })];

const fronts = entries.filter(({ isFile }) => isFile).map(({ path, name }) => {
  const content = Deno.readTextFileSync(path);
  const { __content, ...meta } = safeLoadFront(content);
  return { ...meta, name };
}).filter((front) => {
  return "title" in front && "category" in front;
}).map((front) => {
  const { title, name, category } = front as {
    name: string;
    title: string;
    category: string;
  };

  return {
    title,
    category,
    href: join("/docs", name.replace(".mdx", "").replaceAll("_", "-")),
  };
}).sort((a, b) => {
  const _a = a.title.toUpperCase();
  const _b = b.title.toUpperCase();
  if (_a < _b) {
    return -1;
  }
  if (_b > _a) {
    return 1;
  }

  return 0;
});

function pickField({ title, href }: {
  title: string;
  category: string;
  href: string;
}) {
  return {
    title,
    href,
  };
}

const gettingStarted = {
  name: "Getting Started",
  items: fronts.filter(({ category }) => category === "Getting Started").map(
    pickField,
  ),
};

const layout = {
  name: "Layout",
  items: fronts.filter(({ category }) => category === "Layout").map(pickField),
};

const flexGrid = {
  name: "Flexbox & Grid",
  items: fronts.filter(({ category }) => category === "Flexbox & Grid").map(
    pickField,
  ),
};

const spacing: NavMenu = {
  name: "Spacing",
  items: fronts.filter(({ category }) => category === "Spacing").map(pickField),
};

const sizing: NavMenu = {
  name: "Sizing",
  items: fronts.filter(({ category }) => category === "Sizing").map(pickField),
};

const border: NavMenu = {
  name: "Border",
  items: fronts.filter(({ category }) => category === "Border").map(pickField),
};

const typography: NavMenu = {
  name: "Typography",
  items: fronts.filter(({ category }) => category === "Typography").map(
    pickField,
  ),
};

const background: NavMenu = {
  name: "Background",
  items: fronts.filter(({ category }) => category === "Background").map(
    pickField,
  ),
};

const filter: NavMenu = {
  name: "Filter",
  items: fronts.filter(({ category }) => category === "Filter")
    .map(
      pickField,
    ),
};

const table: NavMenu = {
  name: "Table",
  items: fronts.filter(({ category }) => category === "Table").map(
    pickField,
  ),
};

const transitions: NavMenu = {
  name: "Transitions & Animation",
  items: fronts.filter(({ category }) => category === "Transitions & Animation")
    .map(
      pickField,
    ),
};
const transforms: NavMenu = {
  name: "Transform",
  items: fronts.filter(({ category }) => category === "Transform").map(
    pickField,
  ),
};

const interactivity: NavMenu = {
  name: "Interactivity",
  items: fronts.filter(({ category }) => category === "Interactivity").map(
    pickField,
  ),
};

const svg: NavMenu = {
  name: "SVG",
  items: fronts.filter(({ category }) => category === "SVG").map(
    pickField,
  ),
};

const accessibility: NavMenu = {
  name: "Accessibility",
  items: fronts.filter(({ category }) => category === "Accessibility").map(
    pickField,
  ),
};

const navMenu: NavMenu[] = [
  gettingStarted,
  layout,
  flexGrid,
  spacing,
  sizing,
  typography,
  background,
  border,
  filter,
  table,
  transitions,
  transforms,
  interactivity,
  svg,
  accessibility,
];

export default <Config> {
  plugins: [
    mapcssPlugin({
      presets: [presetTypography(), presetTw()],
      ext: ["tsx", "mdx"],
    }),
    mdxPlugin({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
      pageProps: { navMenu },
    }),
  ],
};
