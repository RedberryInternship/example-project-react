import React from 'react'
import { ChargerDetail, Opening } from 'screens'
import { render } from '@testing-library/react-native';
import mockCharger from '../factory/charger'
import { mockReactNavigation } from '../mocks/react-navigation'
import { mockSafeAreaContext } from '../mocks/safe-area-context'

it('Snapshorts opening screen', () => {
  const authScreen = render(<Opening />).toJSON();
  expect(authScreen).toMatchSnapshot();
})

it.only('Snapshots charger detail screen', () => {
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
  ));

  const chargerDetailsScreen = render(<ChargerDetail />).toJSON();
  // expect(chargerDetailsScreen).toMatchSnapshot();
});
