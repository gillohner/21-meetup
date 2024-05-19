import { useState, useEffect, useContext } from 'react';
import { Nip07Context } from '../Nip07Context';

const useNostrEvents = () => {
  const ndk = useContext(Nip07Context);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ndk) {
      console.error("Nostr NDK instance is not initialized.");
      setLoading(false);
      return;
    }

    const filters = { kinds: [31923], '#t': ['52Meetups'] };
    const subscription = ndk.subscribe(filters);

    subscription.on('event', event => {
      setEvents(prevEvents => [...prevEvents, event]);
    });

    return () => {
      subscription.end();
      setLoading(false);
    };
  }, [ndk]);

  return { events, loading };
};

export default useNostrEvents;
