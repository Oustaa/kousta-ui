import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.scss",
  output: {
    file: "dist/index.css",
    format: "es",
  },
  plugins: [
    postcss({
      extract: true,
      modules: false,
      use: ["sass"],
      extensions: [".scss", ".css"],
    }),
  ],
};
