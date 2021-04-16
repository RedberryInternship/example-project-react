import React from 'react'
import { render } from '@testing-library/react-native'
import { ChargerWithCode } from 'screens'
import { log } from 'console'
import mockCharger from '../factory/charger'
import { recentlyUsedChargers } from 'screens/tabNavigation/charger/chargerWithCode/helpers'

jest.mock('screens/tabNavigation/charger/chargerWithCode/helpers', () => ({
  recentlyUsedChargers: () => Promise.resolve([mockCharger]),
}))

test('Charger with code - ok', () => {
  render(<ChargerWithCode />)
});

test.only('Charger with code has recently used chargers', async () => {
  const tree = render(<ChargerWithCode />)
  // const chargerCode = mockCharger.code.toString();
  log(tree.getByTestId('lastUsedChargers').children);
  // const result = await recentlyUsedChargers();
})
