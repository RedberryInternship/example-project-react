import React from 'react'
import { Favorites } from 'screens'
import { FavoriteChargerListItem } from 'screens/tabNavigation/favorites/components'
import { render } from '@testing-library/react-native'
import { mockReactRedux } from '../mocks/react-redux'
import mockCharger from '../factory/charger';

const mockFavoriteChargers = [
  {
    ...mockCharger,
    id: 1,
  },
  {
    ...mockCharger,
    id: 2,
  },
  {
    ...mockCharger,
    id: 3,
  },
  {
    ...mockCharger,
    id: 4,
  },
  {
    ...mockCharger,
    id: 5,
  },
];

mockReactRedux.useSelector.mockImplementation(() => ({
  favoriteChargers: mockFavoriteChargers,
}))

test('Favorite chargers screen renders without errors', () => {
  render(<Favorites />)
});

test('There are 5 favorite chargers in the state', async () => {
  const tree = render(<Favorites />);
  const favoriteChargerItemsContainer = await tree.findByTestId('favorites-container');
  const favoriteChargerItems = favoriteChargerItemsContainer.findAllByType(FavoriteChargerListItem);

  expect(favoriteChargerItems).toHaveLength(5)
});
