// Nip07Context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';

const Nip07Context = createContext(null);

export const Nip07Provider = ({ children }) => {
  const [ndk, setNdk] = useState(null);

  useEffect(() => {
    const initNdk = async () => {
      const nip07signer = new NDKNip07Signer();
      const ndkInstance = new NDK({ signer: nip07signer });
      await ndkInstance.connect();
      setNdk(ndkInstance);
    };

    initNdk();
  }, []);

  return (
    <Nip07Context.Provider value={ndk}>
      {children}
    </Nip07Context.Provider>
  );
};

export const useNip07 = () => useContext(Nip07Context);
