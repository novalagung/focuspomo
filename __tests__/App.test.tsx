/**
 * @format
 */

import 'react-native';
import React from 'react';
import StatisticScreen from '../src/screen/StatisticScreen';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<StatisticScreen />);
});
