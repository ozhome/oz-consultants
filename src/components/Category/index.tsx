import React from 'react';
import { useHistory } from 'react-router-dom';

import { useInventory } from '../../hooks/inventory';

import { Container, Text, Image, ImageContainer } from './styles';

interface CategoryProps {
  image: string;
  name: string;
  id: number;
  isCategory?: boolean;
}

const Category: React.FC<CategoryProps> = ({
  image,
  name,
  id,
  isCategory = true,
}) => {
  const { push } = useHistory();
  const { selectedCategory, selectedSubcategory } = useInventory();

  const handleCategory = async () => {
    if (isCategory) {
      selectedCategory(id);
      push('/subcategories');
    } else {
      selectedSubcategory(id);
      push('/items');
    }
  };

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
