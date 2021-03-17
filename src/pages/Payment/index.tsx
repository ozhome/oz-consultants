import React from 'react';
import Header from '../../components/Header';

import { Container } from './styles';

const Payment: React.FC = () => {
  return (
    <Container>
      <Header selected="payment" />
    </Container>
  );
};

export default Payment;
