import React from 'react';
import { Box, VStack, Text, Pressable, useColorModeValue } from 'native-base';
import { i18n } from '../App';

const EventCard = ({ event, onPress }) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedStartDate = dateFormatter.format(new Date(parseInt(event.tags.find(tag => tag[0] === 'start')[1])));
  const formattedEndDate = dateFormatter.format(new Date(parseInt(event.tags.find(tag => tag[0] === 'end')[1])));
  const name = event.tags.find(tag => tag[0] === 'name')[1];
  const location = event.tags.find(tag => tag[0] === 'location')[1];

  // Define color values for light and dark modes
  const bgColor = useColorModeValue('white', 'coolGray.800');
  const borderColor = useColorModeValue('coolGray.300', 'coolGray.600');
  const textColor = useColorModeValue('coolGray.800', 'coolGray.100');
  const secondaryTextColor = useColorModeValue('coolGray.600', 'coolGray.400');
  const tertiaryTextColor = useColorModeValue('coolGray.500', 'coolGray.300');

  return (
    <Pressable onPress={() => onPress(event.id)}>
      <Box borderWidth="1" borderColor={borderColor} borderRadius="md" p="5" m="2" bg={bgColor}>
        <VStack space={3}>
          <Text bold fontSize="md" color={textColor}>
            {name}
          </Text>
          <Text fontSize="xs" color={secondaryTextColor}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
          <Text color={tertiaryTextColor}>
            {i18n.t('location')}: {location}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default EventCard;
