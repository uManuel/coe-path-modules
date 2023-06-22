// ./client/jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  displayName: 'client',
  testEnvironmentOptions: {
    url: 'https://til.test.com',
  },
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupFilesAfterEnv: ['./test/setup-test-framework.js'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/svg-file-mock.js',
  },
  snapshotSerializers: ['jest-glamor-react'],
}
