import React from 'react';
import { Box, Text, ScrollView, useColorModeValue } from 'native-base';
import EventCard from '../components/EventCard';
import useNostrEvents from '../hooks/useNostrEvents';
import { i18n } from '../App';

const HomeScreen = () => {
  const { events, loading } = useNostrEvents();
  const bgColor = useColorModeValue("white", "coolGray.800");
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");

  const handlePress = (eventId) => {
    console.log('Event Pressed:', eventId);
    // Handle navigation or other logic here
  };

  return (
    <ScrollView bg={bgColor}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="xl" bold mt="3" mb="2" color={textColor}>{i18n.t('upcomingEvents')}</Text>
        {loading && <Text color={textColor}>{i18n.t('loading')}</Text>}
        {events.map(event => (
          <EventCard key={event.id} event={event} onPress={handlePress} />
        ))}
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;
