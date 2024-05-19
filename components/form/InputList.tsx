import React, { useState } from "react";
import { FormControl, Input, InputGroup, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center, useToast, InputLeftAddon, NativeBaseProvider } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

const InputList = ({label, list, setList, placeholder, isLink = false}) => {
    const [inputValue, setInputValue] = useState("");
    const toast = useToast();

    const validateInput = (value) => {
        if (isLink) {
            // Basic validation check for links
            const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!urlPattern.test(value);
        }
        return true; // No validation required for non-link
    };

    const addItem = () => {
        if (inputValue.trim() === "") {
            toast.show({
                description: "Please enter text"
            });
            return;
        }
        if (!validateInput(inputValue)) {
            toast.show({
                description: "Please enter a valid URL"
            });
            return;
        }

        const newValue = isLink ? `https://${inputValue}` : inputValue;
        setList(prevList => [...prevList, { value: newValue }]);
        setInputValue("");
    };

    const handleDelete = index => {
        setList(prevList => prevList.filter((_, itemI) => itemI !== index));
    };

    return (
        <FormControl>
            <FormControl.Label>{label}</FormControl.Label>
            <Box maxW="300" w="100%">
                <VStack space={4}>
                    <HStack space={2}>
                        <InputGroup  
                          w="100%"
                          justifyContent="center"
                        >
                          {isLink && <InputLeftAddon children={"https://"} />}
                          <Input
                            flex={1}
                            onChangeText={setInputValue}
                            value={inputValue}
                            placeholder={placeholder}
        
                          />
                          <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={addItem} />
                        </InputGroup>
                    </HStack>
                    <VStack space={2}>
                        {list.map((item, itemI) => (
                            <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.value + itemI.toString()}>
                                <Text width="100%" flexShrink={1} textAlign="left" mx="2">
                                    {item.value}
                                </Text>
                                <IconButton size="sm" colorScheme="trueGray" icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />} onPress={() => handleDelete(itemI)} />
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
            </Box>
        </FormControl>
    );
};

export default InputList;
