module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },

  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/packages/components/src/$1",
    "@hooks/(.*)$": "<rootDir>/packages/hooks/src/$1",
    "@helpers/(.*)$": "<rootDir>/packages/helpers/src/$1",
    "\\.(module\\.css|module\\.scss)$": "identity-obj-proxy",
    "\\.(css|scss)$": "<rootDir>/jest/styleMock.js",
  },
};
