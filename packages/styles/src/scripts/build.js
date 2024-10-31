import Fs from "fs";
import Path from "path";
import * as Sass from "sass";

const getComponents = () => {
  let allComponents = [];

  const types = ["components", "table"];

  types.forEach((type) => {
    const outputFile = Path.resolve(`../${type}/styles.css`);
    const allFiles = Fs.readdirSync(`src/packages/${type}`).map((file) => ({
      input: `src/packages/${type}/${file}`,
      output: outputFile,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (path, fileName, expanded) => {
  const result = Sass.compileString(
    Fs.readFileSync(Path.resolve(path)).toString(),
    {
      style: expanded ? "expanded" : "compressed",
      loadPaths: [Path.resolve("src")],
    },
  );

  Fs.writeFileSync(Path.resolve(fileName), result.css.toString());
};

try {
  Fs.mkdirSync(Path.resolve("lib"));
  // eslint-disable-next-line
} catch (e) {}

compile("src/index.scss", "lib/index.css");

getComponents().forEach((component) => {
  compile(component.input, component.output, true);
});
