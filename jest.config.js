module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    './jest-setup-files-after-env.js'
  ],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
