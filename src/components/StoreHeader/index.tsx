import React, { useCallback, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { RiArrowGoBackFill, RiHome2Line } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import { useStore } from '../../hooks/store';
import { useInventory } from '../../hooks/inventory';
import { useCart } from '../../hooks/cart';
import { useAlert } from '../../hooks/alert';
import { useToast } from '../../hooks/toast';

import Sidebar from '../Sidebar';

import ShowCart from '../ShowCart';

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
  const { goBack, push, replace } = useHistory();
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
    push('payment');
  }, [push]);

  const finish = useCallback(() => {
    if (cart.length) openFinish();
    else
      addToast({
        title: 'Adicione itens ao carrinho',
        type: 'info',
      });
  }, [addToast, cart.length, openFinish]);

  const showCartResult = useCallback(
    async (data: IAlertResult<null>) => {
      if (data.result === 'success') openFinish();
    },
    [openFinish],
  );

  const goHome = useCallback(() => {
    if (back) replace(`/store/${store.document.replace(/\D/g, '')}`);
  }, [back, replace, store.document]);

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
      <button className="image" type="button" onClick={goHome}>
        {store.type === 'oz_go' ? (
          <img src={go} alt="Oz GO" />
        ) : (
          <img src={home} alt="Oz Home" />
        )}
      </button>
      <h1>{`Bem vindo a loja ${store.name}`}</h1>
      <p>Coloque os produtos que deseja na sacola e depois finalize a compra</p>

      <Menu type="button" onClick={() => setSidebar(true)}>
        <FiMenu size={20} />
      </Menu>
      {back && (
        <>
          <Menu type="button" onClick={goBack}>
            <RiArrowGoBackFill size={20} />
          </Menu>
          <Menu type="button" onClick={goHome}>
            <RiHome2Line size={20} />
          </Menu>
        </>
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
            <a href={`https://wa.me/${store.phone}`} target="__blank">
              WhatsApp
            </a>
          </div>
        </section>
      </Sidebar>
    </Container>
  );
};

export default StoreHeader;
