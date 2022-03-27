import { expandGlob } from "https://deno.land/std@0.132.0/fs/expand_glob.ts";
import { Config, Resource } from "./types.ts";
import { isObject } from "./deps.ts";

export function fromFileSystem(): Resource {
  const url = "./**/mapcss.config.ts";
  return {
    url,
    resolve: async () => {
      for await (const { isFile, path } of expandGlob(url)) {
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
