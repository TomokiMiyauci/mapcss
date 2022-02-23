# mapcss

Tiny, composable atomic CSS engine

:construction: This project is currently in beta release. All interfaces are
subject to change.

## What

mapcss is an Atomic-oriented CSS generator.

The essence of mapcss is a mapping of CSS to a JavaScript Object (often referred
to as CSS in JS. We'll call it `JSS` for simplicity).

The mapping can be defined as a hierarchy of Objects, and is a generic data
structure that allows the use of regular expressions.

If the mapped JSS is hit, the JSS will be converted to CSS AST. Currently,
conversion to postcss AST is performed.

After that, the free world of AST will expand.

It is strongly influenced by
[tailwindcss](https://github.com/tailwindlabs/tailwindcss) and
[unocss](https://github.com/antfu/unocss), but with the following differences.

- Mapping is free. And you can define a very flexible mapping syntax.
- Deno is fully supported.

## Usage

mapcss provides several preset.

### tailwind classes

```ts
import {
  generateStyleSheet,
  presetTw,
} from "https://deno.land/x/mapcss@$VERSION/mod.ts";

const code = `<div className="relative flex">
  <p className="text-red-500/20"></p>  
</div>
`;
const result = generateStyleSheet({ presets: [presetTw()] }, code);
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
