import { createContext, ReactNode, useReducer, useEffect } from 'react';
import { authReducer } from '@/lib/utils';

type LoginStatusProviderProps = {
  children: ReactNode;
};

type AuthAction = { type: 'Login' } | { type: 'Logout' };

interface LoginState {
  isLoggedIn: boolean;
}
type LoginStatusContext = {
  state: LoginState;
  dispatch: React.Dispatch<AuthAction>;
};
export const LoginStatusContext = createContext({} as LoginStatusContext);

// Initial state
const initialState: LoginState = {
  isLoggedIn: false,
};

export function LoginStatusProvider({ children }: LoginStatusProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load the login state from localStorage (if available) when the component mounts
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      dispatch({ type: 'Login' });
    }
  }, []);

  // Update localStorage when the login state changes
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [state.isLoggedIn]);
  console.log('Login Status:', state.isLoggedIn);

  return (
    <LoginStatusContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginStatusContext.Provider>
  );
}
