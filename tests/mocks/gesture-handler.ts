import 'jest'

jest.mock(
  'react-native-gesture-handler',
  () => require('react-native-gesture-handler/__mocks__/RNGestureHandlerModule'),
)
