import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AlertContainer from '../components/AlertContainer';

export interface IGenericProp {
  [key: string]: string | number;
}

export interface AlertMessage {
  id: string;
  title: string;
  description?: string;
  custom?: React.FC<any>;
  customProps?: any;
  showButtons?: boolean;
  button?(info?: IGenericProp): Promise<void>;
}

interface AlertContextData {
  addAlert(message: Omit<AlertMessage, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = useCallback((alert: Omit<AlertMessage, 'id'>) => {
    const id = uuid();

    const newAlert = {
      id,
      ...alert,
    };

    setAlerts(state => [...state, newAlert]);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(state => state.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} />
    </AlertContext.Provider>
  );
};

function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) throw new Error('useAlert must be used within a AlertProvider');

  return context;
}

export { useAlert, AlertProvider };
