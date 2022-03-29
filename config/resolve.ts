// This module is browser compatible.

import { Config, Importer, IOConfig, Resource } from "./types.ts";
import { isObject } from "./deps.ts";

/** Check if the value is config Module or not */
export function isConfigModule(value: unknown): value is { default: Config } {
  return isObject(value) &&
    isObject((value as Record<PropertyKey, unknown>)["default"]);
}

/** Resolve Config module, return input and output config  */
export function resolveConfig(
  { extractor, ...rest }: Config,
): IOConfig {
  return {
    inputConfig: {
      extractor,
    },
    outputConfig: rest,
  };
}

export async function resolveConfigFile(
  url: string,
  importer: Importer = (url: string) => import(url),
): Promise<Config | undefined> {
  const module = await importer(url);

  if (isConfigModule(module)) {
    return module.default;
  }
}

export function resolveConfigFilePath(
  resource: Resource,
): Promise<string | undefined> {
  return resolveConfigFilePath(resource);
}
