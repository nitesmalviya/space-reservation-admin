const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",

  transform: {
    ...tsJestTransformCfg,
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],

  // ✅ FIX HERE
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};