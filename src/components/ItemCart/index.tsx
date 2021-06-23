import React from 'react';
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
  const { updateCart } = useCart();
  const { updateInventory } = useInventory();

  const updateInputValue = (quantity: number, inputSet = false) => {
    updateInventory({ ...item, quantity }, inputSet);
    updateCart({ ...item, quantity }, inputSet);
  };

  const handlePlus = () => {
    const quantity = item.to_weight ? 10 : 1;
    updateInputValue(quantity);
  };

  const handleMinus = () => {
    const quantity = item.to_weight ? -10 : -1;
    updateInputValue(quantity);
  };

  const inputAdd = () => {
    if (openModal) openModal(item);
  };

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
