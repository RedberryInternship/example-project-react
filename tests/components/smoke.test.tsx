/* eslint-disable import/first */
// import '../mocks/react-native-device-info'
// import '../mocks/sentry'
// import '../mocks/async-storage'
// import '../mocks/react-native-location'
import { random } from 'lodash';

import React from 'react';
import { render } from '@testing-library/react-native'

const rame = random();

import { Opening } from 'screens'

test('Opening smoke', () => {
  const component = render(<Opening />)
  component.debug('Opening');
  expect(4).toBe(4);
})
