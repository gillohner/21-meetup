// hooks/useNostrEvents.ts
import { useState, useEffect, useContext } from 'react';
import { Nip07Context } from '../Nip07Context';

const useNostrEvents = () => {
  const ndk = useContext(Nip07Context);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ndk) {
      console.error("Nostr NDK instance is not initialized.");
      return;
    }

    setLoading(true);

    const filters = {
      kinds: [31923],
      tags: [['=', 't', 'BitcoinMeetup']]
    };

    const subscription = ndk.subscribe(filters);
    subscription.on('event', (event) => {
      setEvents(prevEvents => [...prevEvents, event]);
    });

    return () => {
      subscription.end();
    };

  }, [ndk]);

  return { events, loading };
};

export default useNostrEvents;
