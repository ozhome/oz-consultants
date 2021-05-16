import React, { useCallback, useRef } from 'react';
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
  DescriptionText,
  Title,
} from './styles';

interface ItemProps {
  item: IItem;
  openModal?(item: IItem): void;
}

const Item: React.FC<ItemProps> = ({ item, openModal }) => {
  const { plusCart, minusCart } = useCart();
  const { updateInventory } = useInventory();
  const maxCharacters = useRef(item.name.length > 40 ? 60 : 95);

  const handlePlus = useCallback(() => {
    const res = plusCart(item);
    updateInventory(res);
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
          <DescriptionText>
            {item.description_sale.length > maxCharacters.current
              ? `${item.description_sale.substr(0, maxCharacters.current)}...`
              : item.description_sale || ''}
          </DescriptionText>
          <PriceContainer>
            <Price>{formatReal(item.price)}</Price>
          </PriceContainer>
        </Info>
        <ContainerItem>
          <ButtonItem type="button" onClick={handleMinus}>
            <FiMinusCircle color="#000" size={40} />
          </ButtonItem>
          <ContainerQty onClick={inputAdd}>
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

export default Item;
