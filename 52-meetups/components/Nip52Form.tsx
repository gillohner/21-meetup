// components/Nip52Form.tsx
import React, { useState } from 'react';
import { VStack, Button, Box } from 'native-base';
import FormInput from './form/FormInput';
import CustomDatePicker from './form/DatePicker';
import { useNip07 } from '../Nip07Context';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { v4 as uuidv4 } from 'uuid';
import { SHA256 } from 'crypto-js';

const Nip52Form = () => {
  const ndk = useNip07();
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleSubmit = async () => {
    if (!ndk) {
      alert('NDK is not initialized');
      return;
    }

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
    alert('Event created successfully!');
  };

  return (
    <Box flex={1} p={4} justifyContent="center" alignItems="center">
      <VStack space={4} w="90%" maxW="400px">
        <FormInput label="Content" value={content} onChange={setContent} />
        <FormInput label="Name" value={name} onChange={setName} />
        <FormInput label="Location" value={location} onChange={setLocation} />
        <CustomDatePicker label="Start" date={start} onDateChange={setStart} />
        <CustomDatePicker label="End" date={end} onDateChange={setEnd} />
        <Button mt={4} onPress={handleSubmit}>
          Create Event
        </Button>
      </VStack>
    </Box>
  );
};

export default Nip52Form;
