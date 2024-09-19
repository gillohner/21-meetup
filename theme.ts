// theme.ts
import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
  }
  },
});

export default customTheme;
