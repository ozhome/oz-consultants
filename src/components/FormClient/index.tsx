import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiPhone } from 'react-icons/fi';
import { BiUserPin } from 'react-icons/bi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import Input from '../Input';
import Button from '../Button';

import getValidationErrors from '../../utils/getValidationErrors';
import isEmpty from '../../utils/isEmpty';
import phoneMask from '../../utils/phoneMask';

import IAlertResult from '../../DTOS/IAlertResult';
import IParamsClient from '../../DTOS/IParamsClient';

import { Container, ButtonContainer } from './styles';
import cpfMask from '../../utils/cpfMask';

interface IFormClient {
  alert(data?: IAlertResult): void;
}

const FormClient: React.FC<IFormClient> = ({ alert }) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IParamsClient) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          phone: Yup.string().required('Telefone obrigatório').min(14).max(16),
          cpf: Yup.string().required('CPF obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!isEmpty({ ...data })) {
          alert({ result: 'success', data: { ...data } });
        } else {
          addToast({
            title: 'Por favor preencha os campos',
            type: 'error',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else
          addToast({
            title: 'Erro inesperado',
            description: 'Por favor tente novamente mais tarde.',
            type: 'error',
          });
      }
    },
    [addToast, alert],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="phone"
          icon={FiPhone}
          placeholder="Telefone"
          maxLength={16}
          onChange={e => {
            e.target.value = phoneMask(e.target.value);
          }}
        />
        <Input
          name="cpf"
          icon={BiUserPin}
          placeholder="CPF"
          onChange={e => {
            e.target.value = cpfMask(e.target.value);
          }}
        />
        <ButtonContainer>
          <Button type="button" onClick={() => alert({ result: 'cancel' })}>
            Cancelar
          </Button>
          <Button type="submit">Finalizar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default FormClient;
