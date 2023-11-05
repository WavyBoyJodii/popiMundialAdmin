import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router.tsx';
import { LoginStatusProvider } from './context/LoginStatusContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginStatusProvider>
      <Router />
    </LoginStatusProvider>
  </React.StrictMode>
);
