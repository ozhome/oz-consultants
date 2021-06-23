import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Category from '../../components/Category';
import Header from '../../components/StoreHeader';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';

import ICategory from '../../DTOS/ICategory';

import { Container, Content } from './styles';

interface IRouteProps {
  cpf: string;
}

const SubCategories: React.FC = () => {
  const {
    selectedSub,
    selectedCateg,
    categories,
    getInventory,
    selectedCategory,
    selectedSubcategory,
  } = useInventory();
  const { push } = useHistory();
  const { cart } = useCart();
  const [modal, setModal] = useState(true);

  const [data, setData] = useState<ICategory[]>(
    categories.filter(
      item => item.has_product && item.parent_id === selectedCateg,
    ),
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
    setData(
      categories.filter(
        item => item.has_product && item.parent_id === selectedCateg,
      ),
    );
  }, [categories, selectedCateg]);

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
              ? 'Por favor selecione uma categoria que deseja'
              : 'Infelizmente não encontramos nenhum para essa categoria.\n' +
                'Utilize o menu para voltar'}
          </h3>
          <div>
            {data.map(item => (
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
