import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.4.1/mod.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.14.25/mod.js";

await esbuild.build({
  plugins: [denoPlugin()],
  entryPoints: ["./worker/mapcss_runtime.ts"],
  outfile: "public/worker.js",
  bundle: true,
  define: {
    "Deno.build": `{ "os": "linux" }`,
  },
  format: "esm",
});

esbuild.stop();
