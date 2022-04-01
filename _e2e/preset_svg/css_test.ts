import { Config, generate } from "../../core/mod.ts";
import { presetSVG } from "../../preset_svg/mod.ts";

import { expect, objectContaining, test } from "../../dev_deps.ts";

test("presetSVG generation test", async () => {
  const config: Config = {
    preset: [presetSVG({
      carbon: {
        "3d-curve-auto-colon":
          `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z" fill="currentColor"/></svg>`,
      },
      html:
        `<path xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="%23e44f26" d="M5.902 27.201L3.655" /></svg>`,
    })],
    minify: true,
  };
  await expect(
    generate("i-carbon-3d-curve-auto-colon", config),
  ).resolves.toEqual(objectContaining({
    css:
      `.i-carbon-3d-curve-auto-colon{--map-icon:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 32 32'%3e%3cpath d='M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z' fill='currentColor'/%3e%3c/svg%3e");background-color:currentColor;height:1em;mask:var(--map-icon) no-repeat;mask-size:100% 100%;width:1em}`,
  }));

  await expect(
    generate("i-html", config),
  ).resolves.toEqual(objectContaining({
    css:
      `.i-html{--map-icon:url("data:image/svg+xml,%3cpath xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 32 32'%3e%3cpath fill='%2523e44f26' d='M5.902 27.201L3.655' /%3e%3c/svg%3e");background:var(--map-icon) no-repeat;background-color:transparent;background-size:100% 100%;height:1em;width:1em}`,
  }));
});

test("color mode is static", async () => {
  const config: Config = {
    preset: [presetSVG({
      carbon: {
        "3d-curve-auto-colon":
          `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z" fill="currentColor"/></svg>`,
      },
      html:
        `<path xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="%23e44f26" d="M5.902 27.201L3.655" /></svg>`,
    }, {
      colorMode: "static",
    })],
    minify: true,
  };
  await expect(
    generate("i-carbon-3d-curve-auto-colon", config),
  ).resolves.toEqual(objectContaining({
    css:
      `.i-carbon-3d-curve-auto-colon{--map-icon:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 32 32'%3e%3cpath d='M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z' fill='currentColor'/%3e%3c/svg%3e");background:var(--map-icon) no-repeat;background-color:transparent;background-size:100% 100%;height:1em;width:1em}`,
  }));
});
