import React, { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import FormManager from '../../components/FormManager';

import Header from '../../components/Header';
import Manager from '../../components/Manager';

import { useAlert, IGenericProp } from '../../hooks/alert';

import {
  Container,
  Content,
  SectionContainer,
  ManagerContainer,
} from './styles';

const Settings: React.FC = () => {
  const { addAlert } = useAlert();

  const [managers, setManagers] = useState<any[]>([
    {
      id: '1',
      name: 'Barista 02',
      email: 'barista02@ozcandy.com.br',
    },
    {
      id: '2',
      name: 'Barista 01',
      email: 'barista01@ozcandy.com.br',
    },
  ]);

  const saveManager = useCallback(async (data?: IGenericProp) => {
    setManagers(state => [...state, data]);
  }, []);

  const destroyManager = useCallback((id: string) => {
    setManagers(state => state.filter(manager => manager.id !== id));
  }, []);

  const addManager = useCallback(async () => {
    addAlert({
      title: `Novo funcionário`,
      button: saveManager,
      custom: FormManager,
      showButtons: false,
    });
  }, [addAlert, saveManager]);

  return (
    <Container>
      <Header selected="settings" />

      <Content>
        <SectionContainer>
          <div className="title">
            <h2>Funcionários</h2>
            <button type="button" onClick={addManager}>
              <FiPlus />
            </button>
          </div>
          <ManagerContainer>
            {managers.map(manager => (
              <Manager
                key={manager.id}
                manager={manager}
                destroy={destroyManager}
              />
            ))}
          </ManagerContainer>
        </SectionContainer>
      </Content>
    </Container>
  );
};

export default Settings;
