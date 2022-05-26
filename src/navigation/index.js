import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
export default function Providers() {
  return (
    // wrapping  authprovider around routes
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}