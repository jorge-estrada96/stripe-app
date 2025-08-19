import { createContext, useState } from 'react';

interface ContextProps {
  children: React.ReactNode;
}

interface DeliveryData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  method: 'standard' | 'express';
}

interface SessionData {
  customerId: string | undefined,
  paymentIntentId:  string | undefined,
  clientSecret:  string | undefined,
  delivery?: DeliveryData,
}

const DEFAULT_SESSION:SessionData = {
  customerId: undefined,
  paymentIntentId: undefined,
  clientSecret: undefined,
};

export const SessionContext = createContext({
  session: DEFAULT_SESSION,
  setSessionData: (updatedSession: Partial<SessionData>) => {},
});

const Context: React.FC<ContextProps> = ({ children }) => {
  const [session, setSession] = useState(DEFAULT_SESSION);

  const setSessionData = (updatedSession: Partial<SessionData>) => {
    setSession((prevSession) => ({
      ...prevSession,
      ...updatedSession,
    }));
  };

  return (
    <SessionContext.Provider value={{ session, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};

export default Context;