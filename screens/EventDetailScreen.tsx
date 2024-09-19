// screens/EventDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Box, Text, Button, useColorModeValue, Spinner, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useNip07 } from '../Nip07Context';
import { NDKEvent } from '@nostr-dev-kit/ndk';

const EventDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const ndk = useNip07();
  const [event, setEvent] = useState<NDKEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue("white", "coolGray.800");
  const textColor = useColorModeValue("coolGray.800", "coolGray.100");
  const secondaryTextColor = useColorModeValue("coolGray.600", "coolGray.400");

  useEffect(() => {
    const fetchEvent = async () => {
      if (ndk && id) {
        try {
          const fetchedEvent = await ndk.fetchEvent(id);
          if (fetchedEvent) {
            setEvent(fetchedEvent);
          }
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [ndk, id]);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg={bgColor}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!event) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg={bgColor}>
        <Text color={textColor}>Event not found</Text>
      </Box>
    );
  }

  const name = event.tags.find(tag => tag[0] === 'name')?.[1] || 'Unnamed Event';
  const description = event.content;
  const location = event.tags.find(tag => tag[0] === 'location')?.[1] || 'No location specified';
  const start = event.tags.find(tag => tag[0] === 'start')?.[1];
  const end = event.tags.find(tag => tag[0] === 'end')?.[1];

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  });

  return (
    <ScrollView bg={bgColor}>
      <Box p={4}>
        <VStack space={4}>
          <Text fontSize="3xl" fontWeight="bold" color={textColor}>{name}</Text>
          
          <Box>
            <Text fontSize="md" fontWeight="bold" color={textColor}>Description:</Text>
            <Text color={textColor}>{description}</Text>
          </Box>
          
          <Box>
            <Text fontSize="md" fontWeight="bold" color={textColor}>Location:</Text>
            <Text color={textColor}>{location}</Text>
          </Box>
          
          <Box>
            <Text fontSize="md" fontWeight="bold" color={textColor}>Start:</Text>
            <Text color={secondaryTextColor}>
              {start ? dateFormatter.format(new Date(parseInt(start))) : 'Not specified'}
            </Text>
          </Box>
          
          <Box>
            <Text fontSize="md" fontWeight="bold" color={textColor}>End:</Text>
            <Text color={secondaryTextColor}>
              {end ? dateFormatter.format(new Date(parseInt(end))) : 'Not specified'}
            </Text>
          </Box>
          
          <Button mt={4} onPress={() => {/* TODO: Implement RSVP logic */}}>
            RSVP
          </Button>
          
          {/* TODO: Add attendees list component */}
          
          {/* TODO: Add comments component */}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default EventDetailScreen;
