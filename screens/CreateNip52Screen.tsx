// screens/CreateNip52Screen.tsx
import React from 'react';
import { Box, ScrollView } from 'native-base';
import Nip52Form from '../components/Nip52Form';

const CreateNip52Screen = () => (
  <ScrollView>
    <Box flex={1} justifyContent="center" alignItems="center">
      <Nip52Form/>
    </Box>
  </ScrollView>
);

export default CreateNip52Screen;
