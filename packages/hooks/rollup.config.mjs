import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      postcss({
        extensions: [".css"],
        inject: true,
        extract: "dist/styles/styles.css",
      }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
];
