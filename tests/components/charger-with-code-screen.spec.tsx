import React from 'react'
import { render } from '@testing-library/react-native'
import { ChargerWithCode } from 'screens'
// import { log } from 'console'
import mockCharger from '../factory/charger'

jest.mock('screens/tabNavigation/charger/chargerWithCode/helpers', () => ({
  recentlyUsedChargers: () => Promise.resolve([mockCharger]),
}))

test('Charger with code - ok', () => {
  render(<ChargerWithCode />)
});

test.only('Charger with code has recently used chargers', () => {
  const tree = render(<ChargerWithCode />)
  const lastUsedChargersScrollView = tree.getByTestId('lastUsedChargers');

  expect(lastUsedChargersScrollView.children.length).toBe(1);
})
