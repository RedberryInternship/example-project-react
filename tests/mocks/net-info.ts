/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {},
  useNetInfo: () => ({
    isConnected: true,
  }),
}))
