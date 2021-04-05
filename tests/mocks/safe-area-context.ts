import 'jest'

export const mockSafeAreaContext = {
  SafeAreaProvider: jest.fn(),
  useSafeAreaInsets: jest.fn(),
};

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
