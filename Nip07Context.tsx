// Nip07Context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';

export const Nip07Context = createContext(null);

export const Nip07Provider = ({ children }) => {
  const [ndk, setNdk] = useState(null);

  useEffect(() => {
    let isActive = true;

    const initNdk = async () => {
      const ndkInstance = new NDK({
        signer: new NDKNip07Signer(),
        explicitRelayUrls: [
          'wss://nostr.cercatrova.me',
          'wss://relay.damus.io',
        ]
      });

      ndkInstance.on('disconnect', () => {
        if (isActive) {
          console.log('Disconnected, attempting to reconnect...');
          initNdk(); // Recursive reinitialization on disconnect
        }
      });

      await ndkInstance.connect();
      setNdk(ndkInstance);
    };

    initNdk();

    return () => {
      isActive = false;
      ndk?.disconnect();
    };
  }, []);

  return (
    <Nip07Context.Provider value={ndk}>
      {children}
    </Nip07Context.Provider>
  );
};

export const useNip07 = () => useContext(Nip07Context);
