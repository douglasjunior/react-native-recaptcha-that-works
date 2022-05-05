/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

it('snapshot', () => {
  const {toJSON} = render(<App />);

  expect(toJSON()).toMatchSnapshot();
});
