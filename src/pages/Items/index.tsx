import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../components/StoreHeader';
import Item from '../../components/Item';
import Modal from '../../components/Modal';
import ModalInput from '../../components/ModalInput';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';
import { useAlert } from '../../hooks/alert';

import ICategory from '../../DTOS/ICategory';
import IItem from '../../DTOS/IItem';

import { Categories, Container, Content } from './styles';

const Items: React.FC = () => {
  const {
    selectedSub,
    selectedCateg,
    products,
    categories,
    getInventory,
    selectedCategory,
    selectedSubcategory,
  } = useInventory();
  const { push } = useHistory();
  const { cart } = useCart();
  const [modal, setModal] = useState(true);
  const { addAlert } = useAlert();

  const [data, setData] = useState<ICategory[]>(
    categories.filter(item => item.has_product),
  );

  useEffect(() => {
    const get = async () => {
      try {
        if (!selectedCateg) push('/');
        await getInventory(cart);
      } catch {
        // TODO
      } finally {
        setModal(false);
      }
    };

    setModal(true);
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCateg]);

  useEffect(() => {
    setData(categories.filter(item => item.has_product));
  }, [categories]);

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
                .filter(item => !item.parent_id && item.idOdoo !== 25)
                .map(item => (
                  <button
                    className={
                      item.idOdoo === selectedCateg ? 'active' : 'inative'
                    }
                    key={item.id}
                    type="button"
                    onClick={() => selectedCategory(item.idOdoo)}
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
              {data.map(item => (
                <button
                  className={item.idOdoo === selectedSub ? 'active' : 'inative'}
                  key={item.id}
                  type="button"
                  onClick={() => selectedSubcategory(item.idOdoo)}
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
