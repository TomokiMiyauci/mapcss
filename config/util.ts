import { expandGlob } from "https://deno.land/std@0.132.0/fs/expand_glob.ts";
import { resolve, toFileUrl } from "https://deno.land/std@0.132.0/path/mod.ts";
import { Resource } from "./types.ts";

export function fromFileSystem(
  option: { root: string } = { root: Deno.cwd() },
): Resource {
  const url = resolve(option.root, "./**/mapcss.config.ts");
  return {
    url,
    resolve: async (url) => {
      for await (const { isFile, path } of expandGlob(url)) {
        if (isFile) {
          return toFileUrl(path).toString();
        }
      }
    },
  };
}
