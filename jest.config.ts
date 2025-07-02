import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './', // Provide the path to your Next.js app to load next.config.js and .env files
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Path to your setup file
  // If you use module aliases in tsconfig.json, you might need:
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/$1', // Example for @/ imports
  // },
  // To ignore certain files in Jest
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/'], // e2e if you add E2E tests later
  // Configure different environments for different test types
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  // Override environment for specific files
  testEnvironment: './jest-environment.js',
  // Force Jest to exit after tests complete
  forceExit: true,
  // Detect open handles to help debug hanging tests
  detectOpenHandles: true,
  // Set a timeout for tests
  testTimeout: 10000,
  // Clear mocks between tests
  clearMocks: true,
  // Automatically restore mocks after each test
  restoreMocks: true,
  // Maximum number of workers to use for tests
  maxWorkers: '50%',
};

// createJestConfig is exported in this way to ensure that the Next.js configuration is loaded and applied to your Jest configuration.
export default createJestConfig(config);