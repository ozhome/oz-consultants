import React, { useCallback } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import IAlertResult from '../../DTOS/IAlertResult';
import { useAlert } from '../../hooks/alert';
import { useCart } from '../../hooks/cart';

import FormatReal from '../../utils/formatReal';

import ShowCart from '../ShowCart';

import { Container, Content, Text } from './styles';

const Cart: React.FC = () => {
  const { amount, cart } = useCart();
  const { addAlert } = useAlert();
  const { push } = useHistory();

  const finish = useCallback(
    async (data: IAlertResult<null>) => {
      if (data.result === 'success' && cart.length) push('payment');
    },
    [cart.length, push],
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
