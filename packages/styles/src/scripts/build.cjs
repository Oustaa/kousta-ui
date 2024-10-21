const Fs = require("fs");
const Path = require("path");
const Sass = require("sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["components", "table"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/packages/${type}`).map((file) => ({
      input: `src/packages/${type}/${file}`,
      output: `lib/${file.slice(0, -4) + "css"}`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (path, fileName) => {
  const result = Sass.compileString(
    Fs.readFileSync(Path.resolve(path)).toString(),
    {
      style: "compressed",
      loadPaths: [Path.resolve("src")],
    },
  );

  Fs.writeFileSync(Path.resolve(fileName), result.css.toString());
};

try {
  Fs.mkdirSync(Path.resolve("lib"));
} catch (e) {}

compile("src/global.scss", "lib/global.css");

// getComponents().forEach((component) => {
//   compile(component.input, component.output);
// });
