import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/StoreHeader';
import Item from '../../components/Item';
import ModalInput from '../../components/ModalInput';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';
import { useAlert } from '../../hooks/alert';

import IItem from '../../DTOS/IItem';

import { Categories, Container, Content } from './styles';

const Items: React.FC = () => {
  const { push } = useHistory();
  const {
    selectedSub,
    selectedCateg,
    products,
    categories,
    selectedCategory,
    selectedSubcategory,
  } = useInventory();
  const { addAlert } = useAlert();

  const openModal = useCallback(
    (item: IItem) => {
      addAlert({
        title: `Informe a quantidade`,
        button: async () => {
          /* TODO */
        },
        custom: ModalInput,
        customProps: { visible: true, item },
        hiddenButtons: true,
      });
    },
    [addAlert],
  );

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

  return (
    <>
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
              ? 'Por favor selecione os produtos que deseja'
              : 'Infelizmente não encontramos nenhum produto.\n' +
                'Utilize o menu para voltar'}
          </h3>
          <Categories>
            {subCategories.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectedSubcategory(item.idOdoo)}
                className={item.idOdoo === selectedSub ? 'active' : 'inative'}
              >
                {item.name}
              </button>
            ))}
          </Categories>
          <div>
            {products
              .filter(item => item.pos_categ_id === selectedSub)
              .map(item => (
                <Item key={item.id} item={item} openModal={openModal} />
              ))}
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Items;
