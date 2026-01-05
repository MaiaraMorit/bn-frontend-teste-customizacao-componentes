module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/bn-frontend-test/src/js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'bn-frontend-test/src/js/**/*.js',
    '!bn-frontend-test/src/js/**/*.test.js',
    '!bn-frontend-test/src/js/main.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/bn-frontend-test/src/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

