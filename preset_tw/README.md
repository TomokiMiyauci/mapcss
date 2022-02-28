# preset-tw

> TailwindCSS Preset for mapcss

## Usage

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
