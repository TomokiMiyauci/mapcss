import { BuildOptions } from "https://deno.land/x/dnt@0.22.0/mod.ts";
import { deepMerge } from "https://deno.land/std@0.122.0/collections/deep_merge.ts";
import type { PackageJsonObject } from "https://deno.land/x/dnt@0.22.0/lib/types.ts";

type DefineMeta = Omit<BuildOptions, "shims" | "package"> & {
  root: string;
} & {
  package: Omit<PackageJsonObject, "version">;
  shims?: BuildOptions["shims"];
};

const meta: DefineMeta[] = [
  {
    root: "core",
    entryPoints: ["./core/mod.ts"],
    outDir: "./npm/core",
    package: {
      name: "@mapcss/core",
      description: "Tiny, composable Atomic CSS engine",
      keywords: [
        "mapcss",
        "atomic-css",
        "atomic-css-engine",
        "css",
        "tailwind",
        "unocss",
        "css-in-js",
        "ast",
      ],
    },
  },
  {
    root: "config",
    entryPoints: ["./config/mod.ts"],
    shims: {
      deno: true,
    },
    outDir: "./npm/config",
    package: {
      name: "@mapcss/config",
      description: "Definition of MapCSS config, loader",
      keywords: [
        "mapcss",
        "config",
        "loader",
      ],
    },
  },
  {
    root: "common",
    entryPoints: ["./common/mod.ts"],
    outDir: "./npm/common",
    package: {
      name: "@mapcss/common",
      description: "Common variables for MapCSS",
      keywords: [
        "mapcss",
        "common",
        "variable",
      ],
    },
  },
  {
    root: "preset_tw",
    entryPoints: ["./preset_tw/mod.ts"],
    outDir: "./npm/preset_tw",
    package: {
      name: "@mapcss/preset-tw",
      description: "Tailwind CSS preset for MapCSS",
      keywords: [
        "mapcss",
        "mapcss-preset",
        "tailwindcss",
      ],
    },
  },
  {
    root: "preset_typography",
    entryPoints: ["./preset_typography/mod.ts"],
    outDir: "./npm/preset_typography",
    package: {
      name: "@mapcss/preset-typography",
      description: "Typography preset for MapCSS",
      keywords: [
        "mapcss",
        "mapcss-preset",
        "typography",
      ],
    },
  },
  {
    root: "preset_svg",
    entryPoints: ["./preset_svg/mod.ts"],
    // https://esm.sh/@iconify/utils is invalid types
    typeCheck: false,
    outDir: "./npm/preset_svg",
    package: {
      name: "@mapcss/preset-svg",
      description: "SVG as CSS for MapCSS",
      keywords: [
        "mapcss",
        "mapcss-preset",
        "svg",
        "icon",
      ],
    },
  },
];

export function cleanVersion(version: string): string {
  return version.replace(/^v(.+)$/, "$1");
}

export function constructMeta(version: string) {
  const baseOption:
    & Partial<
      Omit<BuildOptions, "package">
    >
    & { package?: Partial<PackageJsonObject> } = {
      test: false,
      shims: {
        deno: false,
      },
      typeCheck: true,
      package: {
        version,
        license: "MIT",
        homepage: "https://mapcss.miyauchi.dev",
        repository: {
          type: "git",
          url: "git+https://github.com/TomokiMiyauci/mapcss.git",
        },
        bugs: {
          url: "https://github.com/TomokiMiyauci/mapcss/issues",
        },
        sideEffects: false,
        type: "module",
        publishConfig: {
          access: "public",
        },
      },
      packageManager: "pnpm",
    };

  return meta.map((option) =>
    deepMerge(baseOption, option) as BuildOptions & Pick<DefineMeta, "root">
  );
}
