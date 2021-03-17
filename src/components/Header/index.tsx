import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import logo from '../../assets/images/oz-home.png';

const Header: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="Oz Home" />
      <nav>
        <a href="https://ozhome.com.br/" target="__blank">
          Loja Online
        </a>
        <Link to="SignUp">Seja uma Revendedora</Link>
      </nav>
    </Container>
  );
};

export default Header;
