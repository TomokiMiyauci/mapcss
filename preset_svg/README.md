# preset-svg

> SVG icon for mapcss

## Usage

```ts
import {
  type Config,
  generate,
} from "https://deno.land/x/mapcss@$VERSION/core/mod.ts";
import {
  iconifyJSON,
  presetSvg,
} from "https://deno.land/x/mapcss@$VERSION/preset_svg/mod.ts";
import carbon from "https://esm.sh/@iconify-json/carbon/icons.json" assert {
  type: "json",
};

const config: Config = {
  preset: [presetSvg({
    svgMap: {
      carbon: iconifyJSON(carbon),
      bitcoin: "<svg ...</svg>",
    },
  })],
};
// generate("i-bitcoin i-carbon-logo-github", config).css;
```
