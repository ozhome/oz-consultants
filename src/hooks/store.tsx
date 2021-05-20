import React, { createContext, useCallback, useContext, useState } from 'react';
import IStore from '../DTOS/IStore';
import api from '../services/api';

interface IStoreContextData {
  store: IStore;
  findStore(cpf: string): Promise<void>;
}

const StoreContext = createContext<IStoreContextData>({} as IStoreContextData);

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<IStore>({} as IStore);

  const findStore = useCallback(async (cpf: string) => {
    const { data } = await api.get(`/users/consultants/document/${cpf}`);
    api.defaults.headers.ErpID = data.store;
    setStore(data);
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
