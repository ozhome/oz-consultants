import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Category from '../../components/Category';
import Header from '../../components/StoreHeader';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import { useInventory } from '../../hooks/inventory';
import { useStore } from '../../hooks/store';
import { useToast } from '../../hooks/toast';

import formatDocument from '../../utils/formatDocument';

import ICategory from '../../DTOS/ICategory';

import { Container, Content } from './styles';

interface IRouteProps {
  cpf: string;
}

const Store: React.FC = () => {
  const { cpf } = useParams<IRouteProps>();
  const { push } = useHistory();

  const { findStore, store } = useStore();
  const { addToast } = useToast();
  const {
    categories,
    getCategories,
    selectedCategory,
    selectedSubcategory,
    getExternalConsultant,
  } = useInventory();

  const [modal, setModal] = useState(true);
  const [data, setData] = useState<ICategory[]>([]);

  const handleCategory = useCallback(
    async (id: number) => {
      if (store.is_external_consultant) {
        selectedSubcategory(id);
      } else {
        selectedCategory(id);
        push('/subcategories');
      }
    },
    [push, selectedCategory, selectedSubcategory, store.is_external_consultant],
  );

  useEffect(() => {
    const get = async () => {
      if (
        store?.document &&
        cpf &&
        formatDocument(store?.document) === formatDocument(cpf)
      ) {
        setModal(false);
        return;
      }
      let is_external = false;
      try {
        is_external = await findStore(cpf);
      } catch {
        addToast({
          title: 'Consultor não encontrado',
          type: 'error',
        });
        push('/');
        setModal(false);
        return;
      }
      try {
        if (is_external) {
          await getExternalConsultant();
        } else {
          addToast({
            title: 'Pesquisando produtos',
            type: 'info',
          });
          await getCategories();
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(
      categories.filter(ca => ca.has_children_product && ca.idOdoo !== 25),
    );
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
