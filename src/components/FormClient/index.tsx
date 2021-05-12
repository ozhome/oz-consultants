import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiPhone, FiHome } from 'react-icons/fi';
import { BiUserPin } from 'react-icons/bi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { useCart } from '../../hooks/cart';
import { useStore } from '../../hooks/store';

import Input from '../Input';
import Button from '../Button';

import getValidationErrors from '../../utils/getValidationErrors';
import isEmpty from '../../utils/isEmpty';
import phoneMask from '../../utils/phoneMask';
import cpfMask from '../../utils/cpfMask';

import IAlertResult from '../../DTOS/IAlertResult';
import IParamsClient from '../../DTOS/IParamsClient';
import IFinishOrder from '../../DTOS/IFinishOrder';

import { Container, ButtonContainer } from './styles';

interface IFormClient {
  alert(data?: IAlertResult<IFinishOrder>): void;
}

const FormClient: React.FC<IFormClient> = ({ alert }) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { cart, amount } = useCart();
  const { store } = useStore();

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
          address: Yup.string().required('Endereço completo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!isEmpty({ ...data })) {
          alert({
            result: 'success',
            data: { client: data, cart, store, amount },
          });
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
    [addToast, alert, amount, cart, store],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="phone"
          icon={FiPhone}
          placeholder="Telefone"
          maxLength={16}
          type="tel"
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
        <Input name="address" icon={FiHome} placeholder="Endereço completo" />
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
