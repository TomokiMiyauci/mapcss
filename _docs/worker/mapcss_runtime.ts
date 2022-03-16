import {
  generate,
  preflightCSS,
  presetTw,
} from "https://deno.land/x/mapcss@v1.0.0-beta.34/mod.ts";

self.addEventListener(
  "message",
  (
    { data: { code, rawConfig } }: MessageEvent<
      { code: string; rawConfig: string }
    >,
  ) => {
    import(
      `data:text/javascript;base64,${btoa(rawConfig)}`
    ).then((module) => {
      const { css } = generate(
        { preset: [presetTw()], css: preflightCSS },
        code,
        module.default ?? {},
      );
      self.postMessage(css);
    }).catch(() => {});
  },
);
