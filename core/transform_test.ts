import { transform } from "./transform.ts";
import { expect, objectContaining } from "../dev_deps.ts";

Deno.test("disabled injecting CSS", async () => {
  await expect(transform("body{ color: red }", {
    css: {
      "*": {
        color: "blue",
      },
    },
  })).resolves.toEqual(objectContaining({
    css: "body{ color: red }",
  }));
});
