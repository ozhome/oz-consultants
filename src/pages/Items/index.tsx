import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/StoreHeader';
import Item from '../../components/Item';
import ModalInput from '../../components/ModalInput';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';
import { useAlert } from '../../hooks/alert';

import ICategory from '../../DTOS/ICategory';
import IItem from '../../DTOS/IItem';

import { Categories, Container, Content } from './styles';
import { useStore } from '../../hooks/store';

const Items: React.FC = () => {
  const { push } = useHistory();
  const { store } = useStore();
  const {
    selectedSub,
    selectedCateg,
    products,
    categories,
    selectedCategory,
    selectedSubcategory,
  } = useInventory();
  const { addAlert } = useAlert();

  const [data, setData] = useState<ICategory[]>(
    categories.filter(item => item.has_product),
  );

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

  const updateCateg = (id: number) => {
    selectedCategory(id);
    push('/subcategories');
  };

  useEffect(() => {
    setData(categories.filter(item => item.has_product));
  }, [categories]);

  return (
    <>
      <Cart />
      <Container>
        <Header back>
          <section>
            <h3>Categorias</h3>
            <div>
              {categories
                .filter(item => !item.parent_id && item.idOdoo !== 25)
                .map(item => (
                  <button
                    className={
                      item.idOdoo === selectedCateg ? 'active' : 'inative'
                    }
                    key={item.id}
                    type="button"
                    onClick={() => updateCateg(item.idOdoo)}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </section>
          <hr />
          {!store.is_external_consultant && (
            <section>
              <h3>Subcategorias</h3>
              <div>
                {data.map(item => (
                  <button
                    className={
                      item.idOdoo === selectedSub ? 'active' : 'inative'
                    }
                    key={item.id}
                    type="button"
                    onClick={() => selectedSubcategory(item.idOdoo)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </section>
          )}
        </Header>
        <hr />
        <Content>
          <h3>
            {data.length
              ? 'Por favor selecione os produtos que deseja'
              : 'Infelizmente não encontramos nenhum produto.\n' +
                'Utilize o menu para voltar'}
          </h3>
          <Categories>
            {data.map(item => (
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
