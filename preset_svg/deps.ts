// This module is browser compatible.

export {
  iconToSVG,
  parseIconSet,
} from "https://esm.sh/@iconify/utils@1.0.26?pin=v71";
export { defaults } from "https://esm.sh/@iconify/utils@1.0.26/lib/customisations?pin=v71";
export { curry } from "https://deno.land/x/curry@v1.0.0/mod.ts";
export type { IconifyJSON } from "https://esm.sh/@iconify/types@1.0.12/types.ts?pin=v71";
interface Chain<T> {
  map<U>(fn: (val: T) => U): Chain<U>;
  unwrap(): T | never;
}

export function chain<T>(val: T): Chain<T> {
  return {
    map: <U>(fn: (val: T) => U) => chain(fn(val)),
    unwrap: (): T => val,
  };
}
