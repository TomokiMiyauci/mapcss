# mapcss

Tiny, composable Atomic CSS engine

:construction: This project is currently in beta release. All interfaces are
subject to change.

## What

mapcss is an Atomic-oriented CSS generator.

It is strongly influenced by
[tailwindcss](https://github.com/tailwindlabs/tailwindcss) and
[unocss](https://github.com/antfu/unocss), but with the following differences.

- Mapping is free. And you can define a very flexible mapping syntax.
- Deno is fully supported.

### identifier to CSS-in-JS

The essence of mapcss is to map an identifier to a CSS Statement with JavaScript
Object notation (CSS-in-JS).

A Map is a Plain Object with a hierarchical structure, which can be expressed
concisely with Object literals.

For example, the following CSS Statement can be mapped as follows:

```css
.inline-block{display: inline;}
```

```ts
import type { CSSMap } from "https://deno.land/x/mapcss@$VERSION/mod.ts";
const cssMap: CSSMap = {
  inline: {
    block: { display: "inline" },
  },
};
```

It is also possible to express dynamic identifiers using regular expressions.

```css
.z-123{z-index: 123;}
```

```ts
import type { CSSMap } from "https://deno.land/x/mapcss@$VERSION/mod.ts";
const rePositiveNumber = /^(\d+)$/;
const cssMap: CSSMap = {
  z: [
    // It actually checks the validity of the numbers
    [rePositiveNumber, ([, number]) => ({ zIndex: Number(number) })],
  ],
};
```

We support the first class because it is the most frequent mapping to CSS
declaration block.

For the definition of any CSS Statement, CSS-in-JS representation is also
supported.

```css
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
.container{width: 100%;}
```

```ts
import type { CSSMap } from "https://deno.land/x/mapcss@$VERSION/mod.ts";
const cssMap: CSSMap = {
  // className: .container
  container: (_, { className }) => ({
    type: "css",
    value: {
      "@media (min-width: 640px)": {
        [className]: {
          maxWidth: "640px",
        },
      },
      [className]: {
        width: "100%",
      },
    },
  }),
};
```

### The Object search model

Explore the object hierarchy based on identifier. Hierarchy traversal is much
more performant than flat traversal.

For example, the computational complexity of regular expression matching from a
flat structure is O(N).

If the search finds CSS-in-JS, it will be converted to AST. The AST currently
uses the postcss AST.

This will benefit from the postcss ecosystem.

Finally, we show the conversion transition.

```bash
token -> DeepMap(identifier) -> CSS-in-JS -> AST -> Style Sheet
```

## Usage

mapcss provides several preset.

### tailwind classes

```ts
import { generate, presetTw } from "https://deno.land/x/mapcss@$VERSION/mod.ts";

const code = `<div className="relative flex">
  <p className="text-red-500/20"></p>  
</div>
`;
const result = generate({ preset: [presetTw()] }, code);
console.log(result.css);
/*
  .relative{position:relative;}
  .flex{display:flex;}
  .text-red-500\/20{color:rgb(239 68 68/.2);}
*/
```

## License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
