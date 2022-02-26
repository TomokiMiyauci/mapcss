# preset-typography

> Typography Preset for mapcss

## Usage

```ts
import {
  type Config,
  generateStyleSheet,
  presetTypography,
} from "https://deno.land/x/mapcss@$VERSION/mod.ts";

const config: Partial<Config> = {
  preset: [presetTypography()],
};

// generateStyleSheet(config, "prose").css;
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
