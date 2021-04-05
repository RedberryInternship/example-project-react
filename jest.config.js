module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  setupFiles: [
    './tests/mocks/react-native-reanimated.ts',
    './tests/mocks/react-native-location.ts',
    './tests/mocks/gesture-handler.ts',
    './tests/mocks/async-storage.ts',
    './tests/mocks/device-info.ts',
    './tests/mocks/sentry.ts',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  testRegex: '(/tests/components/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  transformIgnorePatterns: [
    '/node_modules/react-native-tab-view',
  ],
}
