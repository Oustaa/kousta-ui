import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { readdirSync } from "fs";
import path from "path";

const packagesDir = "packages";
const packages = readdirSync(packagesDir).filter(
  (pkg) => pkg !== ".DS_Store" && pkg !== "node_modules",
);

export default packages.map((pkg) => {
  const pkgPath = `${packagesDir}/${pkg}`;

  return [
    {
      input: `${pkgPath}/src/index.ts`,
      output: [
        {
          file: `${pkgPath}/dist/cjs/index.cjs.js`,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: `${pkgPath}/dist/esm/index.esm.js`,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        resolve({
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          skip: ["react", "react-dom"],
        }),
        commonjs(),
        typescript({
          tsconfig: `${pkgPath}/tsconfig.json`,
          exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
        }),
        postcss({
          extensions: [".css"],
          inject: true,
          extract: `${pkgPath}/dist/styles/styles.css`,
        }),
      ],
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    {
      input: `${pkgPath}/dist/types/index.d.ts`,
      output: [{ file: `${pkgPath}/dist/lib/index.d.ts`, format: "esm" }],
      plugins: [dts()],
      external: [/\.css$/],
    },
  ];
});
