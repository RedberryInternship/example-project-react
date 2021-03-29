/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('@sentry/react-native', () => ({
  __esModule: true,
  default: {},
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
}));
