import 'jest'

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    addListener: jest.fn(),
    setParams: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: jest.fn(),
  }),
}))
