import React from 'react'
import { Opening } from 'screens'
import { render } from '@testing-library/react-native';

it('Snapshorts auth screen', () => {
  const authScreen = render(<Opening />).toJSON();
  expect(authScreen).toMatchSnapshot();
})
