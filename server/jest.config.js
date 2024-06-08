const config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
};

module.exports = config;
