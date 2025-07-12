module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }]
  },
  rootDir: ".",
  testMatch: ['<rootDir>/src/tests/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1"
  }
};