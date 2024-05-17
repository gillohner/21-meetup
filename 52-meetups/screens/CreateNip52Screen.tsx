// screens/CreateNip52Screen.tsx
import React from 'react';
import { Box } from 'native-base';
import Nip52Form from '../components/Nip52Form';

const CreateNip52Screen = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Nip52Form />
  </Box>
);

export default CreateNip52Screen;
