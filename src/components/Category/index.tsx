import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useInventory } from '../../hooks/inventory';

import { Container, Text, Image, ImageContainer } from './styles';

interface CategoryProps {
  image: string;
  name: string;
  id: number;
}

const Category: React.FC<CategoryProps> = ({ image, name, id }) => {
  const { push } = useHistory();
  const { selectedCategory } = useInventory();

  const handleCategory = useCallback(async () => {
    selectedCategory(id);
    push('/items');
  }, [id, push, selectedCategory]);

  return (
    <Container onClick={handleCategory}>
      <Text>{name}</Text>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
    </Container>
  );
};

export default Category;
