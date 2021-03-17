import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #f9a72b;
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #000;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#f9a72b')};
  }
`;
