import { build, emptyDir } from "https://deno.land/x/dnt@0.22.0/mod.ts";
import { join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { cleanVersion, constructMeta } from "./meta.ts";

async function buildPkg(version: string) {
  await emptyDir("./npm");

  const packages = constructMeta(version);
  await Promise.all(packages.map(async (pkg) => {
    await build(pkg);
    await Deno.copyFile("LICENSE", join(pkg.outDir, "LICENSE"));
    await Deno.copyFile(
     "CHANGELOG.md",
      join(pkg.outDir, "CHANGELOG.md"),
    );
    await Deno.copyFile(
      join(pkg.root, "README.md"),
      join(pkg.outDir, "README.md"),
    );
  }));
}

if (import.meta.main) {
  const version = Deno.args[0];
  if (!version) {
    console.error("argument is required");
    Deno.exit(1);
  }
  await buildPkg(cleanVersion(version));
}
