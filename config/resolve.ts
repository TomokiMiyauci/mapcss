// This module is browser compatible.

import { Importer, Resource } from "./types.ts";
import { Config } from "../core/types.ts";
import { isObject } from "./deps.ts";

/** Check if the value is config Module or not */
export function isConfigModule(value: unknown): value is { default: Config } {
  return isObject(value) &&
    isObject((value as Record<PropertyKey, unknown>)["default"]);
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
