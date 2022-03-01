<div align="center">
  <h1>mapcss</h1>

Tiny, composable Atomic CSS engine

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black&color=black)](https://deno.land/x/mapcss)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/mapcss)

[![release](https://img.shields.io/github/v/release/TomokiMiyauci/mapcss?sort=semver&color=black&logo=github)](https://github.com/TomokiMiyauci/mapcss/releases)
[![deno version](https://img.shields.io/badge/deno-^1.18.0-black?logo=deno)](https://github.com/denoland/deno)
[![deno doc](https://img.shields.io/badge/deno-doc-black)](https://doc.deno.land/https/deno.land/x/mapcss/mod.ts)

[![test](https://github.com/TomokiMiyauci/mapcss/actions/workflows/test.yaml/badge.svg?branch=beta)](https://github.com/TomokiMiyauci/mapcss/actions/workflows/test.yaml)
[![codecov](https://codecov.io/gh/TomokiMiyauci/mapcss/branch/main/graph/badge.svg?token=nQZ8Nnx3KH)](https://codecov.io/gh/TomokiMiyauci/mapcss)
[![DeepSource](https://deepsource.io/gh/TomokiMiyauci/mapcss.svg/?label=active+issues&token=1Omp7qqFQESc-ArgLDUEIpUI)](https://deepsource.io/gh/TomokiMiyauci/mapcss/)
[![DeepScan grade](https://deepscan.io/api/teams/10684/projects/19438/branches/504638/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10684&pid=19438&bid=504638)

[![Semver](https://img.shields.io/badge/semver-2.0.0-black?logo=semVer)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-black.svg?logo=git)](https://conventionalcommits.org)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-black?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/TomokiMiyauci/mapcss?color=black&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAEFCu8CAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABHddaYAAAC5UlEQVRIDd2WPWtVQRCGby5pVASLiGghQSxyG8Ui2KWwCfkH9olY2JneQkiR0oCIxH/gB+qVFDYBIWBAbAIRSbCRpLXwIxLiPT7vnNm9e87ZxJtUwYH3zO47Mzv7Mbv3tlo5KYriGtgAJ81OY1ENdG/YI4boFEOI911BXgY/pdtwGuAtXpvmB1tAXHDnUolE5urkPOQo6MqA3pXWmJJL4Bb4rQ7yEYfxsjnIF29NJIoNC6e5fxOL/qN+9KCz7AaLpN8zI415N2i2EptpGrkRIjGeAuvR6IY1hSFLFUOug9Ms2M7ZxIUNytm1mnME186sdI2BOCwAyQMg54ugzSmKmwbPwSbolKH+hbAtQdsOoF+BsF3anUVwBdiOWRidFZDKTTrKEAJTm3GVrGkHzw/uPZbyx7DNNLfB7KGmRsCcr+/gjaiPSpAOTyX9qG4L/XBDdWXDDf1M+wtQ5fwCOtcb4Dto6VpLmzByB6gqdHbTItGSJdAGqibJQhmRfCF7IN4beSF2G9CqnGXQrxofXU+EykllNeoczRgYytDKMubDIRK0g5MF8rE69cGu0u9nlUcqaUZ41W0qK2nGcSzr4D2wV9U9wxp1rnpxn8agXAOHMQ9cy9kbHM7ngY4gFb03TxrO/yfBUifTtXt78jCrjY/jgEFnMn45LuNWUtknuu7NSm7D3QEn3HbatV1Q2jvgIRf1sfODKQaeymxZoMLlTqsq1LF+HvaTqQOzEzUCfni0/eNIA+DfuE3KEtbsegckGmMktTXacnBHPVe687ugkpT+axCkkhBSyRSjWI2xf1KMMVmYiQdWksK9BEFiQoiYLIlvJA3/zeTzCejP0RbB6YPbhZuB+0pR3KcdX0LaJtju0ZgBL8Bd+sbz2QIaU2OfBX3BaQLsgZysQtrk0M8Sh1A0w3DyyYnGnAiZ4gqZ/TvI2A8OGd1YIbF7+F3P+B6dYpYdsJNZgrjO0UdOIhmom0nwL0pnfnzkL1803jAoKhvyAAAAAElFTkSuQmCC)](./LICENSE)

</div>

---

:construction: This project is currently in beta release. All interfaces are
subject to change.

## Features

- 🔝 orderless(experiment)

  User does not need to care about the order of the CSS Statement at all.
  Therefore, there is no concept of `order` or `layer`.

  The RuleSet will be sorted by the number of properties in the Declaration
  Block.

## Usage

mapcss provides several preset.

- [presetTw](./preset_tw/README.md)

  TailwindCSS utility classes and modifier syntax.
- [presetTypography](./preset_typography/README.md)

  Typography utility like
  [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)
  or
  [@unocss/preset-typography](https://github.com/unocss/unocss/tree/main/packages/preset-typography).
- [presetIcon](./preset_icon/README.md)

  SVG markup as CSS. By using the [iconifyJSON](./preset_icon/convert.ts#L8)
  converter, you can use `iconify.json` as a pure CSS icon.

For example, using `presetTw`, you can use the utility class of
[TailwindCSS](https://github.com/tailwindlabs/tailwindcss).

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

You may need `--unstable` and `--allow-read` flag to Deno.

## What

mapcss is an Atomic-oriented CSS generator.

It is strongly influenced by
[TailwindCSS](https://github.com/tailwindlabs/tailwindcss) and
[UnocCSS](https://github.com/antfu/unocss), but with the following differences.

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
token -> DeepMap { identifier -> CSS-in-JS } -> AST -> Style Sheet
```

## License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
