import { createContext, useContext, ReactNode, useState } from 'react';

type LoginStatusProviderProps = {
  children: ReactNode;
};

type LoginStatusContext = {
  isLoggedIn: boolean;
  updateLoginStatus: (x: boolean) => void;
};
const LoginStatusContext = createContext({} as LoginStatusContext);

export function useLoginStatus() {
  return useContext(LoginStatusContext);
}

export function LoginStatusProvider({ children }: LoginStatusProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function updateLoginStatus(x: boolean) {
    setIsLoggedIn(x);
  }
  return (
    <LoginStatusContext.Provider value={{ isLoggedIn, updateLoginStatus }}>
      {children}
    </LoginStatusContext.Provider>
  );
}
