import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AuthAction = { type: 'Login' } | { type: 'Logout' };

interface LoginState {
  isLoggedIn: boolean;
}

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
