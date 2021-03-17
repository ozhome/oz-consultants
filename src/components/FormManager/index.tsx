import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import Input from '../Input';
import Button from '../Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, ButtonContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  cpf: string;
  password: string;
  clientId: string;
  clientSecret: string;
}

interface IFormManager {
  getValues(): any;
  edit?: boolean;
}

const FormManager: React.FC<IFormManager> = ({ getValues, edit }) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo 6 digitos'),
          clientId: Yup.string().required('ERP Key obrigatório'),
          clientSecret: Yup.string().required('ERP Secret obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else if (err?.response?.data?.message)
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: err.response.data.message,
          });
        else
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro por favor tente mais tarde.',
          });
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {edit && <h3>Preencha apenas os campos que deseja editar</h3>}
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Input name="clientId" icon={FiLock} placeholder="ERP Key" />
        <Input name="clientSecret" icon={FiLock} placeholder="ERP Secret" />

        <ButtonContainer>
          <Button type="button" onClick={getValues}>
            Cancelar
          </Button>
          <Button type="submit">Entrar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default FormManager;
