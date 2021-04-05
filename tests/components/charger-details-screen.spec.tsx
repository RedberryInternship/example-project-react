import React from 'react'
import { ChargerDetail } from 'screens'
import { render } from '@testing-library/react-native'
import mockCharger from '../factory/charger'

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    addListener: jest.fn(),
    setParams: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => (
    {
      params: {
        chargerDetails: mockCharger,
        from: 'home',
      },
    }
  ),
}));

jest.mock('react-redux', () => ({
  useSelector: () => ({}),
  useDispatch: jest.fn(),
}));

const mockInsertsImplementation = jest.fn();

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: jest.fn(),
  useSafeAreaInsets: () => mockInsertsImplementation,
}));

mockInsertsImplementation.mockImplementation(() => ({
  top: 10,
}))

test('Charger details screen rendering ok', () => {
  render(<ChargerDetail />);
});

test.only('Charger detail code is right', () => {
  mockCharger.code = '2800';
  const chargerDetailsScreen = render(<ChargerDetail />);
  const text = chargerDetailsScreen.getByTestId('charger-code');
  expect(text.children[0]).toBe('კოდი:#2800');
});
