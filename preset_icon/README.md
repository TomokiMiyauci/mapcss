# preset-icon

> SVG icon for mapcss

## Usage

```ts
import {
  type Config,
  generate,
  iconifyJSON,
  presetIcon,
} from "https://deno.land/x/mapcss@$VERSION/mod.ts";
import carbon from "https://esm.sh/@iconify-json/carbon/icons.json" assert {
  type: "json",
};

const config: Partial<Config> = {
  preset: [presetIcon({
    svgMap: {
      carbon: iconifyJSON(carbon),
      bitcoin: "<svg ...</svg>",
    },
  })],
};
// generate(config, "i-bitcoin i-carbon-logo-github").css;
```
