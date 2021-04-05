import React from 'react'
import { Opening } from 'screens'
import { render } from '@testing-library/react-native'

test('Renders opening screen', async () => {
  render(<Opening />);
});

test('Opening screen has welcome text', async () => {
  const opening = render(<Opening />);
  const text = await opening.findByTestId('title');
  expect(text.children[0]).toBe('Welcome to E-Space');
});
