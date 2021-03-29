/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    Value: jest.fn(),
    EasingNode: {
      out: jest.fn(),
    },
    Easing: {
      out: jest.fn(),
    },
  },
}))
