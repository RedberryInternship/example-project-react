import 'jest'
import RNReanimated from 'react-native-reanimated/src/ReanimatedModule'

const mockReanimated = jest.fn();
mockReanimated.mockImplementation(() => RNReanimated)

jest.mock('react-native-reanimated', () => mockReanimated)
