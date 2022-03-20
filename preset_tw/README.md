# preset-tw

> TailwindCSS Preset for mapcss

## Usage

```ts
import { generate } from "https://deno.land/x/mapcss@$VERSION/core/mod.ts";
import { presetTw } from "https://deno.land/x/mapcss@$VERSION/preset_tw/mod.ts";

const code = `<div className="relative flex">
  <p className="text-red-500/20"></p>  
</div>
`;
const result = generate(code, { preset: [presetTw()] });
console.log(result.css);
/*
  .relative{position:relative;}
  .flex{display:flex;}
  .text-red-500\/20{color:rgb(239 68 68/.2);}
*/
```
