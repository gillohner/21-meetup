// screens/EventDetailScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Box, Text, Button, useColorModeValue } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';

const EventDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { event } = route.params;

  const bgColor = useColorModeValue("white", "coolGray.800");
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");
  const eventName = event?.name;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>{eventName}</Text>
        <Text color={textColor}>{event?.description}</Text>
        <Text color={textColor}>Location: {event?.location}</Text>
        <Text color={textColor}>Start: {new Date(event?.start).toLocaleString()}</Text>
        <Text color={textColor}>End: {new Date(event?.end).toLocaleString()}</Text>
        
        {/* TODO: Add OSM map component here */}
        
        <Button mt={4} onPress={() => {/* TODO: Implement RSVP logic */}}>
          RSVP
        </Button>
        
        {/* TODO: Add attendees list component */}
        
        {/* TODO: Add comments component */}
      </Box>
    </ScrollView>
  );
};

export default EventDetailScreen;
