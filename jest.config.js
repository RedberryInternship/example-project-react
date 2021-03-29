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
  setupFiles: [],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  testRegex: '(/tests/components/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
}
