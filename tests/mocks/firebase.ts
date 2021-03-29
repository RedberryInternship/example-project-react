/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: () => ({
    getToken: () => new Promise((resolve) => resolve('token')),
    requestPermission: () => new Promise((resolve) => resolve(true)),
    onTokenRefresh: () => { },
  }),
}))
