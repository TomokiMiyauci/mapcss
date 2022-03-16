import {
  generate,
  preflightCSS,
  presetTw,
} from "https://deno.land/x/mapcss@v1.0.0-beta.34/mod.ts";

self.onmessage = ({ data }) => {
  const { css } = generate({ preset: [presetTw()], css: preflightCSS }, data);

  self.postMessage(css);
};
