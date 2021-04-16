import 'jest'

export const mockSafeAreaContext = {
  SafeAreaProvider: jest.fn(),
  useSafeAreaInsets: jest.fn(),
};

mockSafeAreaContext.useSafeAreaInsets.mockImplementation(() => (
  {
    top: 10,
  }
))

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
