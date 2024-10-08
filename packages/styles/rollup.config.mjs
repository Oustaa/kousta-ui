import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

export default {
  input: "src/index.scss",
  output: {
    file: "dist/index.css",
    format: "es",
  },
  plugins: [
    postcss({
      extract: true,
      plugins: [autoprefixer()],
      sourceMap: true,
      extensions: [".scss", ".css"],
    }),
  ],
};
