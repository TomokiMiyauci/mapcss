import { expect, ParamReturn } from "../dev_deps.ts";
import { iconifyJSON } from "./convert.ts";

Deno.test("iconifyJSON", () => {
  const table: ParamReturn<typeof iconifyJSON>[] = [
    [{ icons: {}, prefix: "" }, {}],
    [{ prefix: "mdi", icons: { "ab-testing": { body: "<path></path>" } } }, {
      "ab-testing":
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path></path></svg>`,
    }],
  ];
  table.forEach(([json, result]) => expect(iconifyJSON(json)).toEqual(result));
});
