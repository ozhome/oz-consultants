import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Category from '../../components/Category';
import Header from '../../components/StoreHeader';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';

import { Container, Content } from './styles';
import { useStore } from '../../hooks/store';

interface IRouteProps {
  cpf: string;
}

const SubCategories: React.FC = () => {
  const {
    selectedSub,
    selectedCateg,
    categories,
    selectedCategory,
    selectedSubcategory,
  } = useInventory();
  const { push } = useHistory();
  const { store } = useStore();
  const [modal, setModal] = useState(true);

  const handleCategory = useCallback(
    (id: number, isCategory = false) => {
      if (isCategory) {
        selectedCategory(id);
        push('/subcategories');
      } else {
        selectedSubcategory(id);
        push('/items');
      }
    },
    [push, selectedCategory, selectedSubcategory],
  );

  const subCategories = useMemo(() => {
    return categories.filter(
      category => category.has_product && category.parent_id === selectedCateg,
    );
  }, [categories, selectedCateg]);

  useEffect(() => {
    const get = async () => {
      try {
        if (!selectedCateg) push('/');
      } catch {
        // TODO
      } finally {
        setModal(false);
      }
    };

    setModal(true);
    get();
  }, [push, selectedCateg, store.is_external_consultant]);

  return (
    <>
      <Modal visible={modal} />
      <Cart />
      <Container>
        <Header back>
          <section>
            <h3>Categorias</h3>
            <div>
              {categories
                .filter(item => item.has_children_product && item.idOdoo !== 25)
                .map(item => (
                  <button
                    className={
                      item.idOdoo === selectedCateg ? 'active' : 'inative'
                    }
                    key={item.id}
                    type="button"
                    onClick={() => handleCategory(item.idOdoo, true)}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </section>
          <hr />
          <section>
            <h3>Subcategorias</h3>
            <div>
              {subCategories.map(item => (
                <button
                  className={item.idOdoo === selectedSub ? 'active' : 'inative'}
                  key={item.id}
                  type="button"
                  onClick={() => handleCategory(item.idOdoo)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        </Header>
        <hr />
        <Content>
          <h3>
            {subCategories.length
              ? 'Por favor selecione uma categoria que deseja'
              : 'Infelizmente não encontramos nenhum para essa categoria.\n' +
                'Utilize o menu para voltar'}
          </h3>
          <div>
            {subCategories.map(item => (
              <Category
                key={item.id}
                image={item.image}
                name={item.name}
                id={item.idOdoo}
                isCategory={false}
              />
            ))}
          </div>
        </Content>
      </Container>
    </>
  );
};

export default SubCategories;
