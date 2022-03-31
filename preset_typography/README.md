# preset-typography

> Typography Preset for mapcss

## Usage

```ts
import {
  type Config,
  generate,
} from "https://deno.land/x/mapcss@$VERSION/core/mod.ts";
import { presetTypography } from "https://deno.land/x/mapcss@$VERSION/preset_typography/mod.ts";

const config: Config = {
  preset: [presetTypography()],
};

// generate("prose", config).css;
```

## Feature

- **Fully customizable default styles**

  The default style can be overridden or disabled for each selector or
  declaration block.

  This allows for complete customization without worrying about selector lists
  or selector syntax distortion.

- **Dark mode**

  Apply typographic dark mode with `prose-invert`. For instance,
  `prose dark:prose-invert` will use the inverted colors in the dark mode.

- **Scoped style**

  Styles are marked with a `:where` pseudo-classes. Styles of elements not
  within `prose` will stay the same.

- **Undo with an identifier**

  identifier is default as `not`.

  Apply `not-prose` to the elements to undo the typographic styles. For example,
  `<code class="not-prose">` will skip this preset style

## API

### types

```ts
export type TypographyOptions = {
  /** The class name to use the typographic utilities.
   * @default `prose`
   */
  className: string;
  /**
   * Extend or overwrite default style.
   *
   * @default undefined
   */
  css?: Tree<string | number | false>;
};

type Tree<Leaf, P extends PropertyKey = string | number> = {
  [k in P]: Leaf | Tree<Leaf>;
};
```

### `options.className`

The class name to use the typographic utilities.

default is `prose`

### `options.css`

Extend or overwrite [default style](#default-style).

You can use CSS in JavaScript notation to change the default style. The value
can be a `string` or `number`. Also, selectors that are set to `false` will be
removed from the default style altogether.

It can also be specified in bulk in the selector list, with or without spaces.

#### example

As default style:

```css
// $variablePrefix = "map-"
// $className = "prose"
h1, h2 {
  color: var(--map-prose-headings);
  font-weight: 600;
  line-height: 1.25;
}
a {
  color: var(--map-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
a code {
  color: var(--map-prose-links);
}
```

```ts
import { presetTypography } from "https://deno.land/x/mapcss@$VERSION/preset_typography/mod.ts";

presetTypography({
  css: {
    h1: false,
    a: {
      color: false,
      textDecoration: false,
      fontWeight: 100,
      fontSize: "1.5em",
    },
  },
});
```

output:

> The actual output will be given the class selector and `:where`
> pseudo-classes.

```css
h2 {
  color: var(--map-prose-headings);
  font-weight: 600;
  line-height: 1.25;
}
a {
  font-weight: 100;
  font-size: 1.5em
}
a code {
  color: var(--map-prose-links);
}
```

## Default style

@see [DEFAULT](./identifier/prose.ts#L40)

```css
// $variablePrefix = "map-"
// $className = "prose"
h1, h2 {
  color: var(--map-prose-headings);
  font-weight: 600;
  line-height: 1.25;
}
a {
  color: var(--map-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
a code {
  color: var(--map-prose-links);
}
p, ul, ol, pre {
  margin: 1em 0;
  line-height: 1.75;
}
blockquote {
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
  border-left: .25em solid var(--map-prose-borders);
}
h3 {
  margin: 1.5em 0 .5em;
  font-size: 1.375em;
}
h4 {
  margin: 1em 0;
  font-size: 1.125em;
}
img, video {
  max-width: 100%;
}
figure, picture {
  margin: 1em 0;
}
figcaption {
  color: var(--map-prose-captions);
  font-size: .875em;
}
code {
  color: varCode;
  font-size: .875em;
  font-weight: 600;
  font-family:
  ui-monospace; SFMono-Regular, Menlo, Monaco, Consolas, Liberation-Mono, Courier-New, monospace;
}
:not(pre) > code::before, :not(pre) > code::after {
  content: '`';
}
pre {
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  border-radius: .375rem;
}
pre, code {
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  hyphens: none;
  background: transparent
}
pre code {
  font-weight: inherit;
}
ol, ul {
  padding-left: 1.25em;
}
ul {
  list-style-type: disc;
}
ol > li::marker, ul > li::marker, summary::marker {
  color: var(--map-prose-lists);
}
hr {
  margin: 2em 0;
  border: 1px solid var(--map-prose-hr);
}
table {
  display: block;
  margin: 1em 0;
  border-collapse: collapse;
  overflow-x: auto;
}
tr:nth-child(2n) {
  background: var(--map-prose-bg-soft);
}
td; th {
  border: 1px solid var(--map-prose-borders);
  padding: .625em 1em;
}
abbr {
  cursor: help;
}
kbd {
  color: var(--map-prose-code);
  border: 1px solid;
  padding: .25rem .5rem;
  font-size: .875em;
  border-radius: .25rem;
}
details {
  margin: 1em 0;
  padding: 1.25rem 1.5rem;
  background: var(--map-prose-bg-soft);
}
summary {
  cursor: pointer;
  font-weight: 600;
}
```

## Relation

- [TailwindCSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [UnoCSS Typography](https://github.com/unocss/unocss/blob/main/packages/preset-typography/README.md)
