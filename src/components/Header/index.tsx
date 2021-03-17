import React, { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import {
  FiHome,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { BiTransfer } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, Logo, Store, Nav } from './styles';

import logo from '../../assets/images/logo.png';

interface IMenu {
  name: string;
  route: string;
  icon: React.ComponentType<IconBaseProps>;
  active?: boolean;
}

interface IHeader {
  selected?: string;
}

const Header: React.FC<IHeader> = ({ selected = 'dashboard' }) => {
  const { store } = useAuth();
  const [menu, setMenu] = useState<IMenu[]>([
    { name: 'Dashboard', route: 'dashboard', icon: FiHome },
    { name: 'Pagamentos', route: 'payment', icon: BiTransfer },
    { name: 'Configurações', route: 'settings', icon: FiSettings },
  ]);

  useEffect(() => {
    const menuUpdate = menu.map(item => ({
      ...item,
      active: item.route === selected,
    }));

    setMenu(menuUpdate);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const active = document.querySelector('nav a.active');
    if (active) {
      active.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [menu]);

  return (
    <Container>
      <header>
        <Logo>
          <img src={logo} alt="Oz Home" />
          <h1>HOME</h1>
        </Logo>
        <Store>
          <img src={store.logo} alt={store.name} />
          <div>
            <h5>{store.name}</h5>
            <p>{store.franchise_type === 'oz_go' ? 'Oz Go' : 'Oz Home'}</p>
          </div>
        </Store>
      </header>
      <Nav>
        <span>
          <FiChevronLeft />
        </span>
        <nav>
          {menu.map(({ icon: Icon, ...link }) => (
            <Link
              key={link.route}
              to={link.route}
              className={link.active ? 'active' : ''}
            >
              <Icon />
              <p>{link.name}</p>
            </Link>
          ))}
        </nav>
        <span>
          <FiChevronRight />
        </span>
      </Nav>
    </Container>
  );
};

export default Header;
