import React from 'react';
import { Box, ScrollView, useColorModeValue } from 'native-base';
import Nip52Form from '../components/Nip52Form';

const CreateNip52Screen = () => {
  const bgColor = useColorModeValue("white", "coolGray.800");

  return (
    <ScrollView bg={bgColor}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Nip52Form/>
      </Box>
    </ScrollView>
  );
};

export default CreateNip52Screen;
