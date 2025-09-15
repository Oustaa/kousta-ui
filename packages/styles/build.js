// packages/styles/build.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import postcss from "postcss";
import atImport from "postcss-import";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.resolve(__dirname, "variables/index.css");
const outDir = path.resolve(__dirname, "dist");
const outFile = path.join(outDir, "tokens.css");

const css = fs.readFileSync(src, "utf8");

const result = await postcss([atImport()]).process(css, {
  from: src,
  to: outFile,
  map: { inline: false },
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, result.css, "utf8");
if (result.map)
  fs.writeFileSync(outFile + ".map", result.map.toString(), "utf8");

console.log("✓ built", path.relative(process.cwd(), outFile));
