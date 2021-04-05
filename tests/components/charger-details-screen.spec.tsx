import React from 'react'
import { ChargerDetail } from 'screens'
import { render } from '@testing-library/react-native'
import mockCharger from '../factory/charger'
import { mockReactNavigation } from '../mocks/react-navigation'
import { mockSafeAreaContext } from '../mocks/safe-area-context'

mockReactNavigation.useRoute.mockImplementation(() => (
  {
    params: {
      chargerDetails: mockCharger,
      from: 'home',
    },
  }
));

mockSafeAreaContext.useSafeAreaInsets.mockImplementation(() => (
  {
    top: 10,
  }
))

jest.mock('react-redux', () => ({
  useSelector: () => ({}),
  useDispatch: jest.fn(),
}));

test('Charger details screen rendering ok', () => {
  render(<ChargerDetail />);
});

test('Charger detail code is right', () => {
  mockCharger.code = '2800';
  const chargerDetailsScreen = render(<ChargerDetail />);
  const text = chargerDetailsScreen.getByTestId('charger-code');
  expect(text.children[0]).toBe('კოდი:#2800');
});
