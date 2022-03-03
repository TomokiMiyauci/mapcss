import { prerelease, valid } from "https://deno.land/x/semver@v1.4.0/mod.ts";
import { cleanVersion, constructMeta } from "./meta.ts";

if (import.meta.main) {
  const version = Deno.args[0];
  if (!version) {
    console.error("arg of version is required");
    Deno.exit(1);
  }
  if (!valid(version)) {
    console.error("The argument of version is invalid");
    Deno.exit(1);
  }

  const isPrerelease = prerelease(cleanVersion(version));
  const tag = isPrerelease?.[0] ?? "latest";

  const packages = constructMeta(version);
  await Promise.all(packages.map(async (pkg) => {
    const result = await Deno.run({
      cmd: ["npm", "publish", pkg.outDir, "--tag", String(tag)],
      stdout: "piped",
    })
      .output();

    console.log(new TextDecoder().decode(result));
  }));
}
