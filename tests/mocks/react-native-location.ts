/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('react-native-location', () => ({
  __esModule: true,
  default: {},
}))
