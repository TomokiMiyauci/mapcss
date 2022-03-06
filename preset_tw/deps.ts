import mediaQueryOrder from "https://esm.sh/sort-css-media-queries@2.0.4/lib/create-sort.js?pin=v66&no-check";

const mobileOrder: <T = string>(a: T, b: T) => number = mediaQueryOrder({});

export { mobileOrder };
