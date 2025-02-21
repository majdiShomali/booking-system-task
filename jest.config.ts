import type { Config } from "jest";

const config: Config = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  transform: {
    // Use babel-jest for both JS and TS files
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { presets: ["next/babel"] }]
  },
  transformIgnorePatterns: [
    // Transform superjson (exclude it from being ignored)
    "/node_modules/(?!(superjson)/)"
  ],
};

export default config;