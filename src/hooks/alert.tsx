import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import AlertContainer from '../components/AlertContainer';
import IAlertMessage from '../DTOS/IAlertMessage';

interface IAlertContextData {
  addAlert(message: Omit<IAlertMessage, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<IAlertContextData>({} as IAlertContextData);

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<IAlertMessage[]>([]);

  const addAlert = useCallback((alert: Omit<IAlertMessage, 'id'>) => {
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

  useEffect(() => {
    const haveAlert = Boolean(alerts.length);
    if (haveAlert) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
    document.querySelector('#modal')?.classList.toggle('active', haveAlert);
  }, [alerts]);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} />
    </AlertContext.Provider>
  );
};

function useAlert(): IAlertContextData {
  const context = useContext(AlertContext);

  if (!context) throw new Error('useAlert must be used within a AlertProvider');

  return context;
}

export { useAlert, AlertProvider };
