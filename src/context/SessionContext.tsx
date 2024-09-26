import { createContext, useState } from 'react';

interface ContextProps {
  children: React.ReactNode;
}

interface SessionData {
  customerId: string | undefined,
  paymentIntentId:  string | undefined,
  clientSecret:  string | undefined,
}

const DEFAULT_SESSION:SessionData = {
  customerId: undefined,
  paymentIntentId: undefined,
  clientSecret: undefined,
};

export const SessionContext = createContext({
  session: DEFAULT_SESSION,
  setSessionData: (updatedSession:any) => {},
});

const Context: React.FC<ContextProps> = ({ children }) => {
  const [session, setSession] = useState(DEFAULT_SESSION);

  const setSessionData = (updatedSession:SessionData) => {
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