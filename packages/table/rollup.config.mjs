// import path from "node:path";
// import { fileURLToPath } from "url";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
// import esbuild from "rollup-plugin-esbuild";
// import postcss from "rollup-plugin-postcss";
// import replace from "@rollup/plugin-replace";
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// export default [
//   {
//     input: "src/index.ts",
//     output: [
//       {
//         format: "es",
//         entryFileNames: "[name].mjs.js",
//         dir: path.resolve(__dirname, "esm"),
//         preserveModules: true,
//         sourcemap: true,
//       },
//       {
//         format: "cjs",
//         entryFileNames: "[name].cjs.js",
//         dir: path.resolve(__dirname, "cjs"),
//         preserveModules: true,
//         sourcemap: true,
//         interop: "auto",
//       },
//     ],
//     plugins: [
//       commonjs(),
//       nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
//       esbuild({
//         sourceMap: false,
//         tsconfig: "./tsconfig.json",
//       }),
//       replace({ preventAssignment: true }),
//       typescript({
//         tsconfig: "./tsconfig.json",
//         declaration: false,
//         declarationDir: undefined,
//       }),
//       postcss({
//         extensions: [".scss", ".css"],
//         extract: true,
//         modules: false,
//         use: [
//           [
//             "sass",
//             {
//               includePaths: [
//                 path.resolve(__dirname, "node_modules"),
//                 path.resolve(__dirname, "../styles/src"),
//               ],
//             },
//           ],
//         ],
//       }),
//     ],
//     external: ["react", "react-dom", "react/jsx-runtime", "@kousta-ui/helpers"],
//   },
// ];
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

const makeConfig = (format, outDir, cssFile) => ({
  ...base,
  output: {
    format,
    dir: path.resolve(outDir),
    entryFileNames: "[name]." + (format === "es" ? "mjs.js" : "cjs.js"),
    preserveModules: true,
    sourcemap: true,
    interop: "auto",
    assetFileNames: (assetInfo) => {
      const name = assetInfo.name || "";
      if (name.endsWith(".css")) return "[name][extname]";
      return "assets/[name]-[hash][extname]";
    },
  },
  plugins: [
    ...base.plugins,
    postcss({
      extract: path.resolve(outDir, cssFile),
      modules: { generateScopedName: "[local]_[hash:base64:5]" },
      sourceMap: true,
      minimize: false,
    }),
  ],
});

export default [
  makeConfig("es", "esm", "index.css"),
  makeConfig("cjs", "cjs", "index.css"),
];
