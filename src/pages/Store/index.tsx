import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Category from '../../components/Category';
import Header from '../../components/StoreHeader';
import Modal from '../../components/Modal';

import { Category as ICategory, useInventory } from '../../hooks/inventory';
import { useStore } from '../../hooks/store';
import { useToast } from '../../hooks/toast';

import { Container, Content } from './styles';
import Cart from '../../components/Cart';

interface IRouteProps {
  cpf: string;
}

const Store: React.FC = () => {
  const { cpf } = useParams<IRouteProps>();
  const { push } = useHistory();

  const { findStore, store } = useStore();
  const { addToast } = useToast();
  const { categories, getCategories, selectedCategory } = useInventory();

  const [modal, setModal] = useState(true);
  const [data, setData] = useState<ICategory[]>(
    categories.filter(ca => !ca.parent_id && ca.idOdoo !== 25),
  );

  const handleCategory = useCallback(
    async (id: number) => {
      selectedCategory(id);
      push('/items');
    },
    [push, selectedCategory],
  );

  useEffect(() => {
    const get = async () => {
      if (store?.cpf === cpf) {
        setModal(false);
        return;
      }
      try {
        await findStore(cpf);
      } catch {
        addToast({
          title: 'Consultor não encontrado',
          type: 'error',
        });
        push('/');
      } finally {
        setModal(false);
      }
      try {
        await getCategories();
      } catch {
        addToast({
          title: 'Erro inesperado',
          description: 'Por favor recarregue a página.',
          type: 'error',
        });
      } finally {
        setModal(false);
      }
    };
    get();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setData(categories.filter(ca => !ca.parent_id && ca.idOdoo !== 25));
  }, [categories]);

  return (
    <>
      <Modal visible={modal} />
      <Cart />
      <Container>
        <Header>
          <section>
            <h3>Categorias</h3>
            <div>
              {data.map(item => (
                <button
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
          <h3>Por favor selecione uma categoria</h3>
          <div>
            {data.map(item => (
              <Category
                key={item.id}
                image={item.image}
                name={item.name}
                id={item.idOdoo}
              />
            ))}
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Store;
