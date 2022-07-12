import React from 'react';
import { render } from '@testing-library/react';
import Add from './Add';

test('renders learn react link', () => {
  const { getByText } = render(<Add />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});