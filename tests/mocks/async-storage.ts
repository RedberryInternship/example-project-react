/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('@react-native-community/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}))
