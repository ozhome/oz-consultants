import React, { useCallback, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import { useStore } from '../../hooks/store';
import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';
import { useAlert } from '../../hooks/alert';
import { useToast } from '../../hooks/toast';

import Sidebar from '../Sidebar';

import FormClient from '../FormClient';
import ShowCart from '../ShowCart';

import sendMessage from '../../utils/sendMessage';

import go from '../../assets/images/oz-go.png';
import home from '../../assets/images/oz-home.png';

import { Container, Menu } from './styles';
import IAlertResult from '../../DTOS/IAlertResult';

interface IProps {
  back?: boolean;
}

const StoreHeader: React.FC<IProps> = ({ children, back }) => {
  const { store } = useStore();
  const { clearCart, cart } = useCart();
  const { clearInventory } = useInventory();
  const { addAlert } = useAlert();
  const { addToast } = useToast();
  const { goBack } = useHistory();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (sidebar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
    document.querySelector('#sidebar')?.classList.toggle('active', sidebar);
  }, [sidebar]);

  const clearProducts = useCallback(() => {
    clearCart();
    clearInventory();
  }, [clearCart, clearInventory]);

  const openFinish = useCallback(() => {
    addAlert({
      title: 'Dados pessoais',
      custom: FormClient,
      button: sendMessage,
      hiddenButtons: true,
    });
  }, [addAlert]);

  const finish = useCallback(() => {
    if (cart.length) openFinish();
    else
      addToast({
        title: 'Adicione itens ao carrinho',
        type: 'info',
      });
  }, [addToast, cart.length, openFinish]);

  const showCartResult = useCallback(
    async (data: IAlertResult) => {
      if (data.result === 'success') openFinish();
    },
    [openFinish],
  );

  const showCart = useCallback(() => {
    if (cart.length)
      addAlert({
        title: 'Sacola',
        custom: ShowCart,
        button: showCartResult,
        hiddenButtons: true,
      });
    else
      addToast({
        title: 'Adicione itens ao carrinho',
        type: 'info',
      });
  }, [addAlert, addToast, cart.length, showCartResult]);

  return (
    <Container>
      {store.type === 'go' ? (
        <img src={go} alt="Oz GO" />
      ) : (
        <img src={home} alt="Oz Home" />
      )}
      <h1>{`Bem vindo a loja ${store.name}`}</h1>
      <p>Coloque os produtos que deseja na sacola e depois finalize a compra</p>

      <Menu type="button" onClick={() => setSidebar(true)}>
        <FiMenu size={20} />
      </Menu>
      {back && (
        <Menu type="button" onClick={goBack}>
          <RiArrowGoBackFill size={20} />
        </Menu>
      )}
      <Sidebar name={store.name} show={sidebar} close={() => setSidebar(false)}>
        {children}
        <hr />
        <section>
          <h3>Sacola</h3>
          <div>
            <button onClick={showCart} type="button">
              Ver sacola
            </button>
            <button onClick={finish} type="button">
              Finalizar pedido
            </button>
            <button onClick={clearProducts} type="button">
              Limpar sacola
            </button>
          </div>
        </section>
        <hr />
        <section>
          <h3>Contato</h3>
          <div>
            <a href={`https://wa.me/${'+5541995245271'}`} target="__blank">
              WhatsApp
            </a>
          </div>
        </section>
      </Sidebar>
    </Container>
  );
};

export default StoreHeader;
