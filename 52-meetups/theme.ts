// theme.ts
import { extendTheme } from 'native-base';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const theme = extendTheme({
  config
});

export default theme;
