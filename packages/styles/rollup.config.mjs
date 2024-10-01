import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    postcss({
      extract: true,
      modules: true,
      use: [
        [
          "sass",
          {
            includePaths: ["node_modules", "packages/styles"],
          },
        ],
      ],
    }),
  ],
};
