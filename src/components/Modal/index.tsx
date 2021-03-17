import React from 'react';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

interface ModalProps {
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, children }) => {
  return !visible ? (
    <></>
  ) : (
    <Container>{children || <FiLoader size={80} color="#f9a72b" />}</Container>
  );
};

export default Modal;
