import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { AlertProvider } from './alert';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AlertProvider>
      <ToastProvider>{children}</ToastProvider>
    </AlertProvider>
  </AuthProvider>
);

export default AppProvider;
