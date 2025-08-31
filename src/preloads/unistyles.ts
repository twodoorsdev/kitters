import { StyleSheet } from 'react-native-unistyles'

import { breakpoints } from '../theme/breakpoints';
import * as themes from '../theme/themes';

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}

  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  breakpoints,
  themes,
});