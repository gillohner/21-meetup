// components/form/TextInput.tsx
import React from 'react';
import { FormControl, Input } from 'native-base';

const TextInput = ({ label, value, onChange,  }) => (
  <FormControl>
    <FormControl.Label>{label}</FormControl.Label>
    <Input value={value} onChangeText={onChange} />
  </FormControl>
);

export default TextInput;
