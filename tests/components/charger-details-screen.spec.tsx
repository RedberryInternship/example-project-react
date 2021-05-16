import React from 'react'
import { ChargerDetail } from 'screens'
import { render } from '@testing-library/react-native'
import mockCharger from '../factory/charger'
import { mockReactNavigation } from '../mocks/react-navigation'

mockReactNavigation.useRoute.mockImplementation(() => (
  {
    params: {
      chargerDetails: mockCharger,
      from: 'home',
    },
  }
));

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

test('Charger has right location', async () => {
  const tree = render(<ChargerDetail />);

  const locationTextField = await tree.findByTestId('chargerLocation');
  const locationText = locationTextField.children[0];

  expect(locationText).toBe(mockCharger.location.ka);
});
