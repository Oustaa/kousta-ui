// scripts/build.js
import Fs from "fs";
import Path from "path";
import * as Sass from "sass";

const CORE_MODULES = ["base/reset", "base/root", "foundation/all"];

const PACKAGES = [
  { type: "components", entry: "styles.scss", out: "styles.css" },
  { type: "table", entry: "styles.scss", out: "styles.css" },
];

function compileStringToFile(source, outFile, { expanded = false } = {}) {
  const result = Sass.compileString(source, {
    style: expanded ? "expanded" : "compressed",
    loadPaths: [Path.resolve("src")],
  });
  Fs.mkdirSync(Path.dirname(outFile), { recursive: true });
  Fs.writeFileSync(outFile, result.css.toString());
  console.log("✓", Path.relative(process.cwd(), outFile));
}

(function buildLibIndex() {
  const src = Fs.readFileSync(Path.resolve("src/index.scss"), "utf8");
  compileStringToFile(src, Path.resolve("lib/index.css"), { expanded: true });
})();

(function buildPackages() {
  PACKAGES.forEach(({ type, entry, out }) => {
    const pkgEntryNoExt = `packages/${type}/${entry.replace(/\.scss$/, "")}`;

    const virtualEntry =
      CORE_MODULES.map((m) => `@use "${m}";`).join("\n") +
      `\n@use "${pkgEntryNoExt}";\n`;

    const outputFile = Path.resolve(`../${type}/${out}`);
    compileStringToFile(virtualEntry, outputFile, { expanded: true });
  });
})();
