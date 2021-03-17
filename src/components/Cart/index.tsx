import React, { useCallback } from 'react';
import { FiShoppingBag } from 'react-icons/fi';

import IAlertResult from '../../DTOS/IAlertResult';
import { useAlert } from '../../hooks/alert';
import { useCart } from '../../hooks/cart';

import FormatReal from '../../utils/formatReal';
import sendMessage from '../../utils/sendMessage';

import ShowCart from '../ShowCart';
import FormClient from '../FormClient';

import { Container, Content, Text } from './styles';

const Cart: React.FC = () => {
  const { amount, cart } = useCart();
  const { addAlert } = useAlert();

  const finish = useCallback(
    async (data: IAlertResult) => {
      if (data.result === 'success' && cart.length)
        addAlert({
          title: 'Dados pessoais',
          custom: FormClient,
          hiddenButtons: true,
          button: sendMessage,
        });
    },
    [addAlert, cart.length],
  );

  const handleCart = useCallback(() => {
    addAlert({
      title: 'Sacola',
      custom: ShowCart,
      customProps: { cart: true },
      button: finish,
      hiddenButtons: true,
    });
  }, [addAlert, finish]);

  if (!cart.length) {
    return <></>;
  }

  return (
    <Container>
      <Content onClick={handleCart}>
        <FiShoppingBag size={40} color="#000" />

        <Text>Ver Sacola</Text>

        <Text>{FormatReal(amount)}</Text>
      </Content>
    </Container>
  );
};

export default Cart;
