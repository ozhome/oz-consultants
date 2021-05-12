import React, { useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';

import Input from '../Input';

import { useCart } from '../../hooks/cart';
import { useInventory } from '../../hooks/inventory';

import IAlertResult from '../../DTOS/IAlertResult';
import IItem from '../../DTOS/IItem';

import { Content, Button, ButtonText } from './styles';

interface ModalProps {
  visible: boolean;
  item: IItem;
  alert(data?: IAlertResult<null>): void;
}

const ModalInput: React.FC<ModalProps> = ({ visible, item, alert }) => {
  const [value, setValue] = useState('');
  const { updateCart } = useCart();
  const { updateInventory } = useInventory();

  const handle = useCallback(() => {
    if (!value) {
      updateInventory({ ...item, quantity: 0 });
      updateCart({ ...item, quantity: 0 });
      alert();
      return;
    }

    const quantity = parseInt(value, 10);

    if (quantity <= 0) {
      updateInventory({ ...item, quantity: 0 });
      updateCart({ ...item, quantity: 0 });
    } else if (item.to_weight) {
      updateInventory({ ...item, quantity });
      updateCart({ ...item, quantity });
    } else if (item.qty_available < quantity) {
      updateInventory({ ...item, quantity: item.qty_available });
      updateCart({ ...item, quantity: item.qty_available });
    } else {
      updateInventory({ ...item, quantity });
      updateCart({ ...item, quantity });
    }

    alert();
  }, [alert, item, updateCart, updateInventory, value]);

  useEffect(() => {
    setValue('');
  }, [item]);

  return !visible ? (
    <></>
  ) : (
    <Content>
      <Form onSubmit={handle}>
        <Input
          name="qty"
          type="numeric"
          value={value}
          placeholder={`Digite a quantidade${
            item.to_weight ? ' em gramas' : ''
          }`}
          onChange={e => {
            return setValue(e.target.value.replace(/\D/g, ''));
          }}
        />
        <Button type="submit">
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Form>
    </Content>
  );
};

export default ModalInput;
