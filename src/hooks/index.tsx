import React from 'react';
import { ToastProvider } from './toast';
import { AlertProvider } from './alert';
import { InventoryProvider } from './inventory';
import { CartProvider } from './cart';
import { StoreProvider } from './store';

const AppProvider: React.FC = ({ children }) => (
  <StoreProvider>
    <InventoryProvider>
      <CartProvider>
        <ToastProvider>
          <AlertProvider>{children}</AlertProvider>
        </ToastProvider>
      </CartProvider>
    </InventoryProvider>
  </StoreProvider>
);

export default AppProvider;
