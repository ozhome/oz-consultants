import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useCart } from '../../hooks/cart';

import Button from '../Button';
import Item from '../Item';

import IAlertResult from '../../DTOS/IAlertResult';

import { Container, ButtonContainer } from './styles';

interface IProps {
  alert(data?: IAlertResult): void;
}

const ShowCart: React.FC<IProps> = ({ alert }) => {
  const formRef = useRef<FormHandles>(null);

  const { cart } = useCart();

  const handleSubmit = useCallback(async () => {
    alert({ result: 'success' });
  }, [alert]);
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {cart.map(item => (
          <Item key={item.id} item={item} cart />
        ))}
        <ButtonContainer>
          <Button type="button" onClick={() => alert({ result: 'cancel' })}>
            Voltar
          </Button>
          <Button type="submit">Finalizar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default ShowCart;
