import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import { ChargerWithCode } from 'screens'
import mockCharger from '../factory/charger'

jest.mock('screens/tabNavigation/charger/chargerWithCode/helpers', () => ({
  recentlyUsedChargers: () => Promise.resolve([mockCharger]),
}))

test('Charger with code - ok', async () => {
  await waitFor(() => {
    render(<ChargerWithCode />)
  })
});

test('Charger with code has recently used chargers', async () => {
  const tree = render(<ChargerWithCode />)
  const lastUsedChargersScrollView = tree.getByTestId('lastUsedChargers');

  await waitFor(() => {
    expect(lastUsedChargersScrollView.children.length).toBe(1);
  });
});
