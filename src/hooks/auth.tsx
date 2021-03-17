import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  store: any; //eslint-disable-line
}

interface SignInCredentials {
  cnpj: string;
  password: string;
}
interface SignUpCredentials {
  cnpj: string;
  password: string;
}

interface AuthContextData {
  store: any; //eslint-disable-line
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  edit(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({
    store: {
      id: '80ef7485-5d0c-48d7-b14e-511ebb37eda9',
      cnpj_cpf: '39.940.805/0001-50',
      idOdoo: 4,
      district: 'Zona 09',
      franchise_type: 'oz_home',
      name: 'OZ HOME Maringá',
      number: '743',
      street: 'Avenida São Paulo',
      zip: '87013-313',
      city: 'Maringá',
      state: 'Paraná (BR)',
      logo: 'https://api-home.ozcandy.com.br/images/store-4.png',
    },
    token: '80ef7485-5d0c-48d7-b14e-511ebb37eda9',
  });

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    // const response = await api.post('/sessions/managers', credentials);

    // const { token, manager: store, erp } = response.data;

    // api.defaults.headers.Authorization = `Bearer ${token}`;
    // api.defaults.headers.ErpID = store.id;
    // api.defaults.headers.ErpToken = erp.token;
    // api.defaults.headers.ErpExpires = erp.expires;
    // setData({ token, store });
    setData({
      store: {
        id: '80ef7485-5d0c-48d7-b14e-511ebb37eda9',
        cnpj_cpf: '39.940.805/0001-50',
        idOdoo: 4,
        district: 'Zona 09',
        franchise_type: 'oz_home',
        name: 'OZ HOME Maringá',
        number: '743',
        street: 'Avenida São Paulo',
        zip: '87013-313',
        city: 'Maringá',
        state: 'Paraná (BR)',
        logo: 'https://api-home.ozcandy.com.br/images/store-4.png',
      },
      token: '80ef7485-5d0c-48d7-b14e-511ebb37eda9',
    });
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    await api.post('/users/managers', credentials);
  }, []);

  const edit = useCallback(async (credentials: SignUpCredentials) => {
    await api.post('/users/managers/edit', credentials);
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ store: data.store, signIn, signUp, edit, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
