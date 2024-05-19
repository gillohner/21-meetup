// components/EventCard.tsx
import React from 'react';
import { Box, VStack, Text, Pressable } from 'native-base';

const EventCard = ({ event, onPress }) => {
  return (  
    <Pressable onPress={() => onPress(event.id)}>
      <Box borderWidth="1" borderColor="coolGray.300" borderRadius="md" p="5" m="2" bg="white">
        <VStack space={3}>
          <Text bold fontSize="md">
            {event.title}
          </Text>
          <Text color="coolGray.600">
            {event.content}
          </Text>
          <Text fontSize="xs" color="coolGray.400">
            {new Date(event.start).toLocaleDateString()} - 
            {new Date(event.end).toLocaleDateString()}
          </Text>
          <Text color="coolGray.500">
            Location: {event.location}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default EventCard;
