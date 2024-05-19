// components/form/LinkInput.tsx
import React from 'react';
import { FormControl, Input, InputGroup, InputLeftAddon } from 'native-base';

const LinkInput = ({ label, value }) => (
  <FormControl>
    <FormControl.Label>{label}</FormControl.Label>
    <InputGroup>
        <InputLeftAddon children={"https://"} />
        <Input placeholder={"placeholder"} value={value}/>
    </InputGroup>
  </FormControl>
);

export default LinkInput;
