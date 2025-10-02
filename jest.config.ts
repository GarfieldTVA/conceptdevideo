import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next-intl/client$': '<rootDir>/tests/mocks/next-intl-client.ts',
    '^next-intl/link$': '<rootDir>/tests/mocks/next-intl-link.tsx'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
        useESM: false
      }
    ]
  },
  transformIgnorePatterns: ['/node_modules/(?!lucide-react|framer-motion)']
};

export default config;
