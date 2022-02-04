import type {
  Plugin,
} from "https://deno.land/x/aleph@v0.3.0-beta.19/types.d.ts";
import util from "https://deno.land/x/aleph@v0.3.0-beta.19/shared/util.ts";
import { safeLoadFront } from "https://esm.sh/yaml-front-matter@4.1.1";
import { walkSync } from "https://deno.land/std@0.122.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.122.0/path/mod.ts";
import { compile } from "https://esm.sh/xdm@1.6.0";

export type CompileOptions = Parameters<typeof compile>[1];

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

const table: NavMenu = {
  name: "Table",
  items: fronts.filter(({ category }) => category === "Table").map(
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
  table,
];

const pattern = /\.mdx$/i;

export function mdxPlugin(options: CompileOptions): Plugin {
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

        const { contents } = await compile(source, options);

        if (framework !== "react") {
          throw new Error(
            `mdx-loader: don't support framework '${framework}'`,
          );
        }

        return {
          code: [
            contents.toString(),
            `MDXContent.meta = ${JSON.stringify(meta)}`,
            `MDXContent.nav = ${JSON.stringify(navMenu)}`,
          ].join("\n"),
        };
      });
    },
  };
}
