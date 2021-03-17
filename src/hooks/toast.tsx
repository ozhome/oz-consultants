import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';
import IToastMessage from '../DTOS/IToastMessage';

interface IToastContextData {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback((message: Omit<IToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      ...message,
    };

    setMessages(state => [...state, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}

export { useToast, ToastProvider };
