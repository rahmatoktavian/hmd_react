import * as React from 'react';
import { DefaultTheme } from 'react-native-paper';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'dodgerblue',
    accent: 'white',
    background: 'white'
  },
};

export default Theme;

