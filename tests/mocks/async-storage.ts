/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

const mockAsyncStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
}

export default mockAsyncStorage;

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
