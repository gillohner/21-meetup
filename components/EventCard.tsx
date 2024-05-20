import React from 'react';
import { Box, VStack, Text, Pressable } from 'native-base';
import { i18n } from '../App';

const EventCard = ({ event, onPress }) => {
  // Using the browser's locale and timezone to format the date
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedStartDate = dateFormatter.format(new Date(parseInt(event.tags.find(tag => tag[0] === 'start')[1])));
  const formattedEndDate = dateFormatter.format(new Date(parseInt(event.tags.find(tag => tag[0] === 'end')[1])));
  const name = event.tags.find(tag => tag[0] === 'name')[1];
  const location = event.tags.find(tag => tag[0] === 'location')[1];

  return (
    <Pressable onPress={() => onPress(event.id)}>
      <Box borderWidth="1" borderColor="coolGray.300" borderRadius="md" p="5" m="2" bg="white">
        <VStack space={3}>
          <Text bold fontSize="md">
            {name}
          </Text>
          <Text color="coolGray.600">
          </Text>
          <Text fontSize="xs" color="coolGray.400">
            {formattedStartDate} - {formattedEndDate}
          </Text>
          <Text color="coolGray.500">
            {i18n.t('location')}: {location}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default EventCard;
