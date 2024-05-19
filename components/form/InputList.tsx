import React from "react";
import { FormControl, Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center, useToast, NativeBaseProvider } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

const InputList = ({label, list, setList, placeholder, inputLeftAddon}) => {
    const [inputValue, setInputValue] = React.useState("");
    const toast = useToast();
  
    const addItem = value => {
      if (value === "") {
        toast.show({
          value: "Please Enter Text",
        });
        return;
      }
  
      setList(prevList => {
        return [...prevList, {
          value: value,
        }];
      });
    };
  
    const handleDelete = index => {
      setList(prevList => {
        const temp = prevList.filter((_, itemI) => itemI !== index);
        return temp;
      });
    };
  
    return (
        <FormControl>
          <FormControl.Label>{label}</FormControl.Label>
          <Box maxW="300" w="100%">
            <VStack space={4}>
              <HStack space={2}>
                <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder={placeholder} />
                <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }} />
              </HStack>
              <VStack space={2}>
                {list.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.value + itemI.toString()}>
                    <Text width="100%" flexShrink={1} textAlign="left" mx="2">
                      {item.value}
                    </Text>
                    <IconButton size="sm" colorScheme="trueGray" icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />} onPress={() => handleDelete(itemI)} />
                  </HStack>)}
              </VStack>
            </VStack>
          </Box>
        </FormControl>
    );
  };

  export default InputList;