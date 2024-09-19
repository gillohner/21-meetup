import React from 'react';
import { FormControl, Input, useColorModeValue } from 'native-base';

const TextInput = ({ label, value, onChange }) => {
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");
  const bgColor = useColorModeValue("white", "coolGray.800");
  const borderColor = useColorModeValue("coolGray.300", "coolGray.600");

  return (
    <FormControl>
      <FormControl.Label _text={{ color: textColor }}>{label}</FormControl.Label>
      <Input 
        value={value} 
        onChangeText={onChange} 
        color={textColor}
        bg={bgColor}
        borderColor={borderColor}
        _focus={{ borderColor: "primary.500" }}
      />
    </FormControl>
  );
};

export default TextInput;
