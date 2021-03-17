import React, { useEffect } from 'react';
import { useSpring } from 'react-spring';
import { FiX } from 'react-icons/fi';

import { Container, Content, Menu } from './styles';

interface IProps {
  name: string;
  close(): void;
  show: boolean;
}

const StoreHeader: React.FC<IProps> = ({ name, children, close, show }) => {
  const { left } = useSpring({
    from: { left: '-120%' },
    left: show ? '0' : '-120%',
  });

  useEffect(() => {
    document.querySelectorAll('#sidebar button').forEach(element => {
      element.addEventListener('click', close);
    });
  }, [close]);

  return (
    <Container style={{ left }} id="sidebar">
      <header>
        <h2>{`Loja ${name}`}</h2>
        <Menu type="button">
          <FiX size={20} />
        </Menu>
      </header>
      <Content>{children}</Content>
    </Container>
  );
};

export default StoreHeader;
