import 'jest'
import { TouchableOpacity } from 'react-native'
import mockGestureHandler from 'react-native-gesture-handler/__mocks__/RNGestureHandlerModule'

const mockGestureHandlerObject = {
  ...mockGestureHandler,
  BorderlessButton: TouchableOpacity,
  TouchableOpacity,
}

jest.mock('react-native-gesture-handler', () => mockGestureHandlerObject)
