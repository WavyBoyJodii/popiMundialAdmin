import { useContext } from 'react';
import { LoginStatusContext } from '@/context/LoginStatusContext';

export function useLoginStatus() {
  const context = useContext(LoginStatusContext);
  if (!context) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }
  return context;
}
