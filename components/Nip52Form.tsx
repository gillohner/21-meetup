import React, { useState } from 'react';
import { VStack, Button, Box, Center, Spinner, Icon, Text } from 'native-base';
import FormInput from './form/FormInput';
import CustomDatePicker from './form/DatePicker';
import { useNip07 } from '../Nip07Context';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { v4 as uuidv4 } from 'uuid';
import { SHA256 } from 'crypto-js';
import { Ionicons } from '@expo/vector-icons';

const Nip52Form = () => {
  const ndk = useNip07();
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!ndk) {
      alert('NDK is not initialized');
      return;
    }

    setLoading(true);
    setSuccess(false);

    const pubkey = ndk.signer.pubKeyHex;
    const createdAt = Math.floor(Date.now() / 1000);
    const event = {
      id: '',
      pubkey,
      created_at: createdAt,
      kind: 31923,
      content,
      tags: [
        ['d', uuidv4()],
        ['name', name],
        ['start', start.getTime().toString()],
        ['end', end.getTime().toString()],
        ['start_tzid', Intl.DateTimeFormat().resolvedOptions().timeZone],
        ['end_tzid', Intl.DateTimeFormat().resolvedOptions().timeZone],
        ['location', location],
      ],
    };

    event.id = SHA256(JSON.stringify(event)).toString();

    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = 31923;
    ndkEvent.content = JSON.stringify(event.content);
    ndkEvent.tags = event.tags;

    await ndkEvent.publish();
    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setContent('');
    setName('');
    setLocation('');
    setStart(new Date());
    setEnd(new Date());
    setSuccess(false);
  };

  return (
    <Box flex={1} p={4} justifyContent="center" alignItems="center">
      {!loading && !success && (
        <VStack space={4} w="90%" maxW="400px">
          <FormInput label="Name" value={name} onChange={setName} />
          <FormInput label="Description" value={content} onChange={setContent} />
          <FormInput label="Location" value={location} onChange={setLocation} />
          <CustomDatePicker label="Start" date={start} onDateChange={setStart} />
          <CustomDatePicker label="End" date={end} onDateChange={setEnd} />
          <Button mt={4} onPress={handleSubmit}>
            <Text>Create Event</Text>
          </Button>
        </VStack>
      )}
      {loading && (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      )}
      {success && (
        <Center flex={1}>
          <Icon as={Ionicons} name="checkmark-circle" size="lg" color="green.500" />
          <Text mt={2} fontSize="lg" color="green.500">
            Event created successfully!
          </Text>
          <Button mt={4} onPress={handleReset}>
            Create Another Event
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default Nip52Form;
