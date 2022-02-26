import { Config, generateStyleSheet, presetIcon } from "../../mod.ts";
import { expect, test } from "../../dev_deps.ts";

test("presetIcon generation test", () => {
  const config: Partial<Config> = {
    preset: [presetIcon({
      svgMap: {
        carbon: {
          "3d-curve-auto-colon":
            `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z" fill="currentColor"/></svg>`,
        },
      },
    })],
  };
  expect(generateStyleSheet(config, "i-carbon-3d-curve-auto-colon").css).toBe(
    `.i-carbon-3d-curve-auto-colon{--map-icon:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 32 32'%3E%3Cpath d='M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z' fill='currentColor'/%3E%3C/svg%3E");-webkit-mask:var(--map-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;height:1em;mask:var(--map-icon) no-repeat;mask-size:100% 100%;width:1em}`,
  );
});
