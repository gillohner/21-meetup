// theme.ts
import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

export default customTheme;
