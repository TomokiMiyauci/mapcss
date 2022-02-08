# mapcss

Tiny, composable atomic CSS engine

:construction: This project is currently in beta release. All interfaces are
subject to change.

## What

mapcss is an Atomic-oriented CSS generator.

It is strongly influenced by
[tailwindcss](https://github.com/tailwindlabs/tailwindcss) and
[unocss](https://github.com/antfu/unocss), but with the following differences.

- There are no dependencies like postcss.
- There are no large classes, and it is written with functional types in mind.
  As a result, there are no unnecessary bundles, and the browser can be used
  comfortably.
- Deno is fully supported.

## Usage

mapcss provides several preset.

### tailwind classes

```ts
import { generate, presetTw } from "https://deno.land/x/mapcss@$VERSION/mod.ts";

const code = `<div className="relative flex">
  <p className="text-red-500/20"></p>  
</div>
`;
const result = generate({ presets: [presetTw()] }, code);
console.log(result.css);
/*
  .relative{position:relative;}
  .flex{display:flex;}
  .text-red-500\/20{color:rgba(239,68,68,0.2);}
*/
```

## License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
