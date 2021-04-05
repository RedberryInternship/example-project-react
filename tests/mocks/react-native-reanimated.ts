import 'jest'
import { View as mockView } from 'react-native'

jest.mock('react-native-reanimated', () => ({
  Value: jest.fn(),
  event: jest.fn(),
  add: jest.fn(),
  eq: jest.fn(),
  set: jest.fn(),
  cond: jest.fn(),
  interpolate: jest.fn(),
  View: mockView,
  Extrapolate: { CLAMP: jest.fn() },
  Transition: {
    Together: 'Together',
    Out: 'Out',
    In: 'In',
  },
  Easing: {
    in: jest.fn(),
    out: jest.fn(),
    inOut: jest.fn(),
  },
}));
