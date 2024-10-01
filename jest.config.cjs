module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/packages/components/src/$1",
    "@hooks/(.*)$": "<rootDir>/packages/hooks/src/$1",
    "@helpers/(.*)$": "<rootDir>/packages/helpers/src/$1",
  },
};
