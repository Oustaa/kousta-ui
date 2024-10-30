import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "es",
      entryFileNames: "[name].mjs.js",
      dir: path.resolve("./esm"),
      preserveModules: true,
      sourcemap: true,
    },
    {
      format: "cjs",
      entryFileNames: "[name].cjs.js",
      dir: path.resolve("./cjs"),
      preserveModules: true,
      sourcemap: true,
      interop: "auto",
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
    }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
};
