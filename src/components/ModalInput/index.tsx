import React, { useRef } from 'react';
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
  const { updateCart } = useCart();
  const { updateInventory } = useInventory();
  const inputValue = useRef<number>(item.quantity);

  const handle = () => {
    if (inputValue.current !== item.quantity) {
      updateInventory({ ...item, quantity: inputValue.current || 0 }, true);
      updateCart({ ...item, quantity: inputValue.current || 0 }, true);
    }
    alert();
  };

  return !visible ? (
    <></>
  ) : (
    <Content>
      <Form onSubmit={handle}>
        <Input
          name="qty"
          type="numeric"
          placeholder={`Digite a quantidade${
            item.to_weight ? ' em gramas' : ''
          }`}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, '');
            inputValue.current = parseFloat(value);
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
