import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from 'react';

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
const LoginStatusContext = createContext({} as LoginStatusContext);

export function useLoginStatus() {
  const context = useContext(LoginStatusContext);
  if (!context) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }
  return context;
}
// Initial state
const initialState: LoginState = {
  isLoggedIn: false,
};

export const authReducer = (state: LoginState, action: AuthAction) => {
  switch (action.type) {
    case 'Login':
      return { isLoggedIn: true };
    case 'Logout':
      return { isLoggedIn: false };
    default:
      return state;
  }
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
