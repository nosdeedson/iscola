/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "ts"
  // ],
  rootDir: "src",
  // testRegex: ".*\\.spec\\.ts$",
  // moduleNameMapper:{
  //   "^src/(.*)$": "<rootDir>/$1"
  // }
};