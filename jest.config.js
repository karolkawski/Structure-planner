module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
    '\\.(css|less|sass|scss)$': '<rootDir>/styleMock.js',
    '\\.(png|jpg|jpeg|gif|svg)$': 'identity-obj-proxy',
  },
};
