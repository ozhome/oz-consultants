import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IStore {
  name: string;
  id: string;
  cpf: string;
  store: string;
  type: 'go' | 'home';
}

interface IStoreContextData {
  store: IStore;
  findStore(cpf: string): Promise<void>;
}

const StoreContext = createContext<IStoreContextData>({} as IStoreContextData);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<IStore>({} as IStore);

  const findStore = useCallback(async (cpf: string) => {
    try {
      const { data } = await api.get(`/consultants/${cpf}`);
      setStore(data);
    } catch {
      setStore({
        name: 'Maria Clara',
        id: 'id-aletatorio',
        store: 'colombo',
        cpf,
        type: 'go',
      });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ store, findStore }}>
      {children}
    </StoreContext.Provider>
  );
};

function useStore(): IStoreContextData {
  const context = useContext(StoreContext);

  if (!context) throw new Error('useStore must be used within a StoreProvider');

  return context;
}

export { useStore, StoreProvider };
