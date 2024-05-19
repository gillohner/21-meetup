// screens/SettingsScreen.tsx
import React from 'react';
import { Box, Text, Button, useColorMode, ScrollView } from 'native-base';

const SettingsScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ScrollView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Settings Screen</Text>
        <Button onPress={toggleColorMode} mt="4">
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Box>
    </ScrollView>
  );
};

export default SettingsScreen;