import { expandGlob } from "https://deno.land/std@0.132.0/fs/expand_glob.ts";
import { resolve, toFileUrl } from "https://deno.land/std@0.132.0/path/mod.ts";
import { Config, Resource } from "./types.ts";
import { isObject } from "./deps.ts";

export function fromFileSystem(
  option: { root: string } = { root: Deno.cwd() },
): Resource {
  const url = resolve(option.root, "./**/mapcss.config.ts");
  const filePath = toFileUrl(url).toString();
  return {
    url,
    resolve: async () => {
      for await (const { isFile, path } of expandGlob(filePath)) {
        if (isFile) {
          return path;
        }
      }
    },
  };
}

/** Check if the value is config Module or not */
export function isConfigModule(value: unknown): value is { default: Config } {
  return isObject(value) &&
    isObject((value as Record<PropertyKey, unknown>)["default"]);
}

fromFileSystem();
