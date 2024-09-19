import React from 'react';
import { Box, Text, Button, useColorMode, ScrollView, useColorModeValue } from 'native-base';

const SettingsScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "coolGray.800");
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");

  return (
    <ScrollView bg={bgColor}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color={textColor}>Settings Screen</Text>
        <Button onPress={toggleColorMode} mt="4">
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Box>
    </ScrollView>
  );
};

export default SettingsScreen;
