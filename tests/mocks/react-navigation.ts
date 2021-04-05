import 'jest'

export const mockReactNavigation = {
  useNavigation: () => ({
    addListener: jest.fn(),
    setParams: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: jest.fn(),
};

jest.mock('@react-navigation/native', () => mockReactNavigation)
