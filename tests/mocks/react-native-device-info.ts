/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('react-native-device-info', () => ({
  __esModule: true,
  default: {
    getVersion: jest.fn(),
  },
}))
