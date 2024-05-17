// components/form/Input.tsx
import React from 'react';
import { FormControl, Input } from 'native-base';

const FormInput = ({ label, value, onChange }) => (
  <FormControl>
    <FormControl.Label>{label}</FormControl.Label>
    <Input value={value} onChangeText={onChange} />
  </FormControl>
);

export default FormInput;
