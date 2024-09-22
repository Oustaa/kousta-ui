import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js", // Output CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js", // Output ES module
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({ extensions: [".css"], inject: true, extract: false }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  {
    input: "dist/types/index.d.ts", // Point to the correct path for types
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
