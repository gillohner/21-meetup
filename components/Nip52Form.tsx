// components/Nip52Form.tsx
import React, { useState } from 'react';
import { VStack, Button, Box, Center, Spinner, Icon, Text } from 'native-base';
import { useNip07 } from '../Nip07Context';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { v4 as uuidv4 } from 'uuid';
import { SHA256 } from 'crypto-js';
import { Ionicons } from '@expo/vector-icons';
import TextInput from './form/TextInput';
import CustomDatePicker from './form/DatePicker';
import InputList from './form/InputList'
import { i18n } from '../App';

const Nip52Form = () => {
  const ndk = useNip07();
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [tags, setTags] = useState(new Array());
  const [links, setLinks] = useState(new Array());

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
    const hashtagTags = tags.map(tag => ["t", tag.value]);
    const referenceLinks = links.map(link => ["r", link.value]);

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
        ['g', ''],
        ['t', '52Meetups'],
        ...hashtagTags,
        ...referenceLinks,
      ],
    }

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
          <TextInput label={i18n.t('name')} value={name} onChange={setName} />
          <TextInput label={i18n.t('description')} value={content} onChange={setContent} />
          <TextInput label={i18n.t('location')} value={location} onChange={setLocation} />
          <CustomDatePicker label={i18n.t('start')} date={start} onDateChange={setStart} />
          <CustomDatePicker label={i18n.t('end')} date={end} onDateChange={setEnd} />
          <InputList 
            label={i18n.t('hashtags')}
            list={tags}
            setList={setTags}
            placeholder={i18n.t('addHashtag')}
          ></InputList>
          <InputList
            label={i18n.t('externalLinks')}
            list={links}
            setList={setLinks}
            placeholder={i18n.t('exampleDomain')}
            isLink={true}
          ></InputList>
          <Button mt={4} onPress={handleSubmit}>
            <Text>{i18n.t('createEvent')}</Text>
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
            {i18n.t('eventCreatedSuccessfully')}
          </Text>
          <Button mt={4} onPress={handleReset}>
            {i18n.t('createAnotherEvent')}
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default Nip52Form;
