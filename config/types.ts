// This module is browser compatible.

export type Resource = {
  url: string;
  resolve: (url: string) => undefined | string | Promise<string | undefined>;
};

export type Importer = (url: string) => Promise<unknown>;
