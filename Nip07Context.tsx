import React, { createContext, useContext, useEffect, useState } from 'react';
import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';

// Create a Context
export const Nip07Context = createContext(null);

export const Nip07Provider = ({ children }) => {
  const [ndk, setNdk] = useState(null);

  useEffect(() => {
    let isActive = true; // Flag to control the lifecycle inside useEffect

    const initNdk = async () => {
      const nip07signer = new NDKNip07Signer();

      // Adding default relays alongside potential signer-provided relays
      const defaultRelays = [
        'wss://nostr.cercatrova.me',
      ];
      const signerRelays = nip07signer.getRelays ? await nip07signer.getRelays() : [];
      const allRelays = [...new Set([...defaultRelays])]; // Combine and deduplicate relays

      const ndkInstance = new NDK({
        signer: nip07signer,
        explicitRelayUrls: defaultRelays
      });

      ndkInstance.on('disconnect', () => {
        if (isActive) {
          console.log('Disconnected, attempting to reconnect...');
          initNdk(); // Recursively try to reinitialize on disconnect
        }
      });

      await ndkInstance.connect();
      setNdk(ndkInstance);
    };

    initNdk();

    return () => {
      isActive = false; // Update the flag to prevent reconnection after component unmount
      ndk?.disconnect();
    };
  }, []);

  return (
    <Nip07Context.Provider value={ndk}>
      {children}
    </Nip07Context.Provider>
  );
};

// Export the useContext Hook for easy usage
export const useNip07 = () => useContext(Nip07Context);
