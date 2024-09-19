import React from 'react';
import { FormControl, Input, InputGroup, InputLeftAddon, useColorModeValue } from 'native-base';

const LinkInput = ({ label, value }) => {
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");
  const bgColor = useColorModeValue("white", "coolGray.800");
  const borderColor = useColorModeValue("coolGray.300", "coolGray.600");

  return (
    <FormControl>
      <FormControl.Label _text={{ color: textColor }}>{label}</FormControl.Label>
      <InputGroup>
        <InputLeftAddon children={"https://"} bg={bgColor} _text={{ color: textColor }} />
        <Input 
          placeholder={"placeholder"} 
          value={value} 
          color={textColor}
          bg={bgColor}
          borderColor={borderColor}
          _focus={{ borderColor: "primary.500" }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default LinkInput;
