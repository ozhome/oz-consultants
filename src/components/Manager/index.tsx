import React, { useCallback } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';

import { useAlert, IGenericProp } from '../../hooks/alert';
import { useToast } from '../../hooks/toast';

import Button from '../Button';
import FormManager from '../FormManager';

import { Container } from './styles';

interface IManager {
  manager: {
    id: string;
    name: string;
    email: string;
  };
  destroy(id: string): void;
}

const Manager: React.FC<IManager> = ({ manager, destroy }) => {
  const { addAlert } = useAlert();
  const { addToast } = useToast();

  const updateManager = useCallback(
    async (data?: IGenericProp) => {
      addToast({
        title: 'Usuário não atualizado',
        description: 'Método não implementado',
        type: 'error',
      });
    },
    [addToast],
  );

  const destroyManagar = useCallback(async () => {
    destroy(manager.id);
    addToast({
      title: 'Usuário não deletado',
      description: 'Método não implementado',
      type: 'error',
    });
  }, [addToast, destroy, manager.id]);

  const deleteManager = useCallback(async () => {
    addAlert({
      title: `Excluir ${manager.name}`,
      description: 'Função não implementada',
      button: destroyManagar,
    });
  }, [addAlert, manager, destroyManagar]);

  const editManager = useCallback(async () => {
    addAlert({
      title: `Editar ${manager.name}`,
      button: updateManager,
      custom: FormManager,
      customProps: { edit: true },
      showButtons: false,
    });
  }, [addAlert, manager, updateManager]);

  return (
    <Container>
      <h4>{manager.name}</h4>
      <p>
        {manager.email.length > 24
          ? `${manager.email.substr(0, 20)}...`
          : manager.email}
      </p>

      <Button onClick={editManager}>
        <FiEdit />
        <p>Editar</p>
      </Button>
      <Button onClick={deleteManager}>
        <FiTrash />
        <p>Excluir</p>
      </Button>
    </Container>
  );
};

export default Manager;
