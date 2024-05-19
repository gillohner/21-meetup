// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text, ScrollView } from 'native-base';
import EventCard from '../components/EventCard'; // Ensure this path is correct

const HomeScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // This function should be replaced with actual data fetching from your nostr setup
    const fetchEvents = async () => {
      // Simulating fetching events
      const fetchedEvents = [
        {
          id: '1',
          title: 'Bitcoin Meetup',
          content: 'Join us for a discussion on Bitcoin trends.',
          start: Date.now() / 1000,
          end: (Date.now() / 1000) + 7200,
          location: 'New York'
        },
        // Add more events as needed
      ];
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  const handlePress = (eventId) => {
    console.log('Event Pressed:', eventId);
    // Handle navigation or other logic here
  };

  return (
    <ScrollView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="xl" bold mt="3" mb="2">Upcoming Events</Text>
        {events.map(event => (
          <EventCard key={event.id} event={event} onPress={handlePress} />
        ))}
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;
