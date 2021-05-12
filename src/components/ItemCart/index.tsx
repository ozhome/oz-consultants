import React, { useCallback } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';

import IItem from '../../DTOS/IItem';

import formatReal from '../../utils/formatReal';

import {
  Container,
  Description,
  ImageContainer,
  Info,
  ContainerItem,
  PriceContainer,
  Price,
  ButtonItem,
  ContainerItemText,
  ContainerQty,
  Image,
  Title,
} from './styles';

interface ItemProps {
  item: IItem;
  openModal?(item: IItem): void;
}

const ItemCart: React.FC<ItemProps> = ({ item, openModal }) => {
  const { plusCart, minusCart } = useCart();
  const { updateInventory } = useInventory();

  const handlePlus = useCallback(() => {
    if (item.quantity + 1 <= item.qty_available) {
      const res = plusCart(item);
      updateInventory(res);
    }
  }, [item, plusCart, updateInventory]);

  const handleMinus = useCallback(() => {
    if (item.quantity) {
      const res = minusCart(item);
      updateInventory(res);
    }
  }, [item, minusCart, updateInventory]);

  const inputAdd = useCallback(() => {
    if (openModal) openModal(item);
  }, [item, openModal]);

  return (
    <Container>
      <Title>{item.name}</Title>
      <Description>
        <ImageContainer>
          <Image src={item.image} />
        </ImageContainer>
        <Info>
          <PriceContainer>
            <Price>{formatReal(item.price)}</Price>
          </PriceContainer>
        </Info>
        <ContainerItem>
          <ButtonItem type="button" onClick={handleMinus}>
            <FiMinusCircle color="#000" size={40} />
          </ButtonItem>
          <ContainerQty type="button" onClick={inputAdd}>
            <ContainerItemText>{item.quantity}</ContainerItemText>
            <ContainerItemText>{item.to_weight ? 'g' : ''}</ContainerItemText>
          </ContainerQty>
          <ButtonItem type="button" onClick={handlePlus}>
            <FiPlusCircle color="#000" size={40} />
          </ButtonItem>
        </ContainerItem>
      </Description>
    </Container>
  );
};

export default ItemCart;
