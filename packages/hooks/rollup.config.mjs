import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";

export default [
  {
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
      commonjs(),
      nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
      esbuild({
        sourceMap: false,
        tsconfig: "./tsconfig.json",
      }),
      replace({ preventAssignment: true }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: undefined,
      }),
      postcss({
        extensions: [".css"],
        inject: false,
        extract: (output) => {
          return output.format === "cjs"
            ? "cjs/styles/styles.css"
            : "esm/styles/styles.css";
        },
      }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
];
