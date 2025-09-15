import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const base = {
  input: "src/index.ts",
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: true,
  plugins: [
    nodeResolve({ extensions, preferBuiltins: false }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
    }),
  ],
};

const makeConfig = (format, outDir) => ({
  ...base,
  output: {
    format,
    dir: path.resolve(outDir),
    preserveModules: false,
    sourcemap: true,
    interop: "auto",
    entryFileNames: format === "es" ? "[name].mjs.js" : "[name].cjs.js",
    chunkFileNames:
      format === "es"
        ? "chunks/[name]-[hash].mjs.js"
        : "chunks/[name]-[hash].cjs.js",
    assetFileNames: (asset) => {
      const name = asset.name || "";
      return name.endsWith(".css")
        ? "[name][extname]"
        : "assets/[name]-[hash][extname]";
    },
  },
  plugins: [
    ...base.plugins,
    postcss({
      autoModules: true,
      modules: { generateScopedName: "[local]_[hash:base64:5]" },
      extract: path.resolve(outDir, "index.css"),
      sourceMap: true,
      minimize: false,
    }),
  ],
});

export default [makeConfig("es", "esm"), makeConfig("cjs", "cjs")];
