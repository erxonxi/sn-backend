module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  modulePathIgnorePatterns: ["data", "dist", ".tmp"],
  moduleNameMapper: {
    uuid: require.resolve('uuid')
  }
};
