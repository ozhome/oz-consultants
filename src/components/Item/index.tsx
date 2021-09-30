import React, { useMemo } from 'react';
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

  const description = useMemo(() => {
    const maxCharacters = item.name.length > 40 ? 60 : 95;

    if (item.description_sale.length > maxCharacters)
      return `${item.description_sale.substr(0, maxCharacters)}...`;
    return item.description_sale || '';
  }, [item.description_sale, item.name.length]);

  return (
    <Container>
      <Title>{item.name}</Title>
      <Description>
        <ImageContainer>
          <Image src={item.image} />
        </ImageContainer>
        <Info>
          <DescriptionText>{description}</DescriptionText>
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
